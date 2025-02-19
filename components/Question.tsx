'use client'

import { askQuestion } from '@/utils/api'
import { SyntheticEvent, useState } from 'react'

export default function Question() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data } = await askQuestion(question)

    setAnswer(data)
    setLoading(false)
    setQuestion('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-300 rounded-md p-2 ml-2 text-lg"
          disabled={loading}
          placeholder="سوال خودت رو بنویس"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          درخواست
        </button>
      </form>
      {loading && <p>در حال انجام</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  )
}