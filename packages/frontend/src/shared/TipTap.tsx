'use client'

import { FC } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const TipTap: FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: 'end',
    content: '<p>Hello World! 🌎️</p>',
  })

  return <EditorContent editor={editor} />
}
