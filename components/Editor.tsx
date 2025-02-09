'use client'

import { updateEntry } from "@/actions/entry"
import { useState } from "react"
import { useAutosave } from "react-autosave"

export default function Editor({ entry }: any) {
  const [text, setText] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: text,
    onSave: async (_text: string) => {
      if (_text === entry.content) return
      setIsSaving(true)
      const updated = await updateEntry(entry.id, { content: _text })
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && (
        <div>is saving...</div>
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-full text-xl p-8"
      />
    </div>
  )
}
