import { getUsers } from '@/actions/user';

export default async function Page() {
  const users = getUsers()

  return (
    <div>{users}</div>
  )
}