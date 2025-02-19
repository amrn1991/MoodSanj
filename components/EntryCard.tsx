export default function EntryCard({ entry }: any) {
  const date = new Date(entry.createdAt).toLocaleDateString('fa-IR');
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry.analysis?.summary || "خلاصه"}</div>
      <div className="px-4 py-4">{entry.analysis?.mood || "مود"}</div>
    </div>
  )
}
