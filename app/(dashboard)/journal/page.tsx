import { getEntries } from '@/actions/entry';

export default async function Page() {
  const entries = await getEntries()

  return (
    <div>{JSON.stringify(entries)}</div>
  )
}