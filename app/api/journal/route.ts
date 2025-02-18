import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user: any = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id as string,
      content: 'در مورد روزت بنویس'
      // content: 'tell me about your day!'
    }
  })

  const analysis: any = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis
    }
  })

  revalidatePath("/journal")

  return NextResponse.json({ data: entry })
}