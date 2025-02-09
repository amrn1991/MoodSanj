"use server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db"

export const getUserByClerkID = async (options: any = {}) => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId?.toString() },
    // select: options.select ? options.select : {}
  })

  return user
}