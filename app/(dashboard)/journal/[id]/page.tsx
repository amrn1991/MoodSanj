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

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}
