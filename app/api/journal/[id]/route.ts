import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: any) {
  const { content } = await request.json()
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: { content },
  })

  return NextResponse.json({ data: entry })
}