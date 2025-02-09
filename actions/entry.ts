
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

export async function getEntries() {
  const user: any = await getUserByClerkID({})
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return entries;
}

const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), { method: "POST" })
  )

  if (res.ok) {
    const { data } = await res.json()
    return data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export async function updateEntry(id: string, { content }: any) {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const { data } = await res.json()
    return data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}