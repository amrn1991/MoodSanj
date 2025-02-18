import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: any) {
  const { content } = await request.json()
  const user = await getUserByClerkID()
  const {id} = await params;

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: id,
        userId: user.id,
      },
    },
    data: { content },
  })

  const analysis: any = await analyze(entry)
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: { ...analysis },
    create: {
      entryId: entry.id,
      ...analysis,
    },
  })

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}