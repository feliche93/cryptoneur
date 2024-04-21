// useBuffer.ts
import { useEffect, useState } from 'react'

const useBuffer = (chunk: string): string => {
  const [buffer, setBuffer] = useState('')

  useEffect(() => {
    const updatedChunk = chunk
      .replace('```json', '')
      .replace('```', '')
      .replace(/\n/g, ' ')
      .replace(/^\[/, '')
      .replace(/\]$/, '')
      .trim()

    setBuffer(updatedChunk)
  }, [chunk])

  return buffer
}

export default useBuffer
