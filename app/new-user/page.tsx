import { createUser } from "@/actions/user"

export default async function Page() {
  const user = await createUser()

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

