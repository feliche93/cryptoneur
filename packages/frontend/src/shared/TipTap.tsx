'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC } from 'react'

export const TipTap: FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: 'end',
    content: '<p>Hello World! 🌎️</p>',
  })

  return <EditorContent editor={editor} />
}
