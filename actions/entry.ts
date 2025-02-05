import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

export async function getEntries() {
  const user: any = await getUserByClerkID({select: {email: true}})
  const entries = await prisma.journalEntry.findMany({
    where: {userId: user.id},
    orderBy: {createdAt: 'desc'}
  })

  return entries; 
}