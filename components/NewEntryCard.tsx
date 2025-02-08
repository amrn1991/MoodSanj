'use client'
import { useRouter } from "next/navigation"
import { createNewEntry } from "@/utils/api"

export default function NewEntryCard() {
  const router = useRouter()

  const handleClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleClick}>
        <div className="text-3xl">مطلب تازه</div>
      </div>
    </div>
  )
}
