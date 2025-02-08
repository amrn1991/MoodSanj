import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user: any = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id as string,
      content: 'در مورد روزت بنویس'
    }
  })

  return NextResponse.json({ data: entry })
}