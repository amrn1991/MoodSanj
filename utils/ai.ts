import { TogetherAI } from "@langchain/community/llms/togetherai";


export const analyze = async (prompt: any) => {
  const model = new TogetherAI({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    maxTokens: 256,
  });
  // const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-4o-mini' })
  // const prompt = await getPrompt(content)
  const result = await model.invoke(prompt)
  console.log(result)
  return result;
}