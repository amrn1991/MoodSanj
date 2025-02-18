import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: { userId: user.id, id },
    },
    include: { analysis: true }
  })

  return entry
}

export default async function SingleEntry({ params }: any) {
  const { id } = await params;
  const entry: any = await getEntry(id);
  const { mood, summary, subject, color, negative } = entry?.analysis;
  const analysisData = [
    { name: "خلاصه", value: summary },
    { name: "موضوع", value: subject },
    { name: "مود", value: mood },
    { name: "منفی", value: negative ? "True" : "False" },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3  ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">آنالیز</h2>
        </div>
        <div>
          <ul>
            {analysisData?.map((item: any) => {
              return (
                <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span className="text-left">{item.value}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
