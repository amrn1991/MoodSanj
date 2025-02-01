"use server"
import { createClient } from '@/utils/supabase/server';

export async function getUsers() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();

  return JSON.stringify(users, null, 2);
}