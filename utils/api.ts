const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), { method: "POST" })
  )

  if (res.ok) {
    const { data } = await res.json()
    return data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export async function updateEntry(id: string, { content }: any) {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const { data } = await res.json()
    return data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question: any) => {
  const res = await fetch(
    new Request(createUrl(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}