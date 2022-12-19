import { FC } from 'react'

export interface EomjiCalloutProps {
  emoji: string
  text: string
  type: string
}
export const EomjiCallout: FC<EomjiCalloutProps> = ({ emoji, text, type }) => {
  return (
    <div className={`bg-${type}/10 my-4 rounded-lg py-2 px-4`}>
      <div className="flex items-start justify-start">
        <span className="text-2xl">{emoji}</span>
        <div
          className="prose-primary prose prose-lg mx-4 text-left"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  )
}
