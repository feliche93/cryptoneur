// useUniqueJsonObjects.ts
import { useCallback, useEffect, useState } from 'react'

const useUniqueJsonObjects = (buffer: string): object[] => {
  const [objects, setObjects] = useState<object[]>([])

  const addObject = useCallback((object: object) => {
    setObjects((prevObjects) => {
      const objectExists = prevObjects.some(
        (prevObject) => JSON.stringify(prevObject) === JSON.stringify(object),
      )

      return objectExists ? prevObjects : [...prevObjects, object]
    })
  }, [])

  useEffect(() => {
    let newBuffer = buffer
    let match
    while ((match = newBuffer.match(/(\{[^{}]*?\})(?=,|$)/))) {
      const jsonStr = match[0]

      try {
        const data = JSON.parse(jsonStr) // Try to parse the JSON
        addObject(data)
        newBuffer = newBuffer.slice(jsonStr.length).replace(/^,/, '').trim() // Remove leading comma and trailing whitespaces
      } catch (e) {
        break
      }
    }
  }, [buffer, addObject])

  return objects
}

export default useUniqueJsonObjects
