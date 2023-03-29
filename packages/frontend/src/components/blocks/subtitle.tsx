import React from 'react'
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser'

interface SubtitleProps {
  input: string
}

export const Subtitle: React.FC<SubtitleProps> = ({ input }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'p') {
        return (
          <p className="mx-auto mt-3 max-w-md text-base text-base-content/80 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            {domToReact(domNode.children, options)}
          </p>
        )
      }
    },
  }

  return <>{parse(input, options)}</>
}
