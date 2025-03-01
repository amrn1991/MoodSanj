import { TogetherAI } from "@langchain/community/llms/togetherai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import { Document } from 'langchain/document'
import { z } from "zod"

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    summary: z.string().describe("quick summary of the entire entry."),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
    // sentimentScore: z
    //   .number()
    //   .describe(
    //     "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
    //   ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response in Persian language to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: any) => {
  const model = new TogetherAI({
    model: "Qwen/Qwen2-VL-72B-Instruct",
    maxTokens: 256,
  })
  const prompt = await getPrompt(content)
  const result = await model.invoke(prompt)

  try {
    return parser.parse(result)
  } catch (e) {
    return e
  }

}

export const qa = async (question: any, entries: any) => {
  const docs = entries.map(
    (entry: any) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new TogetherAI({
    model: "Qwen/Qwen2-VL-72B-Instruct",
    maxTokens: 256,
  })
  const chain = loadQARefineChain(model)
  const embeddings = new TogetherAIEmbeddings({
    model: "togethercomputer/m2-bert-80M-8k-retrieval", // Default value
  });
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}