import { getEntries } from '@/actions/entry';
import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';

export default async function Page() {
  const entries = await getEntries()

  return (
    <div className='p-10 bg-zinc-400/10 h-full'>
      <h2 className='text-3xl mb-8'>Journal</h2>
      <div className='grid grid-cols-3 gap-4'>
        <NewEntryCard />
        {
          entries?.map((entry: any) => {
            return <EntryCard key={entry.id} entry={entry} />
          })
        }
      </div>
    </div>
  )
}