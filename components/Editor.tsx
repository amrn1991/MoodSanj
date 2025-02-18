'use client'

import { updateEntry } from "@/actions/entry"
import { useState } from "react"
import { useAutosave } from "react-autosave"

export default function Editor({ entry }: any) {
  const [text, setText] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const { mood, summary, subject, color, negative } = analysis;
  const analysisData = [
    { name: "خلاصه", value: summary },
    { name: "موضوع", value: subject },
    { name: "مود", value: mood },
    { name: "منفی", value: negative ? "بلی" : "خیر" },
  ]

  useAutosave({
    data: text,
    onSave: async (_text: string) => {
      if (_text === entry.content) return
      setIsSaving(true)
      const data = await updateEntry(entry.id, { content: _text })
      setAnalysis(data.analysis)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isSaving && (
          <div>is saving...</div>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">آنالیز</h2>
        </div>
        <div>
          <ul>
            {analysisData?.map((item: any) => {
              return (
                <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span className="text-left">{item.value}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
