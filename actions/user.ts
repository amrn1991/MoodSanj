"use server"
import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function getUsers() {
  const users = await prisma.user.findMany()
  return JSON.stringify(users, null, 2);
}

export async function createUser() {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: { clerkId: user?.id }
  })

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      }
    })
  }

  redirect("/journal")
}