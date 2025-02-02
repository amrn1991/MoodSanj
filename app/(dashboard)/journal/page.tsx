import { getUsers } from '@/actions/user';

export default async function Page() {
  const users = await getUsers()

  return (
    <div>{users}</div>
  )
}