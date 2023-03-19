import React from 'react'
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser'

interface TitleProps {
  input: string
}

export const Title: React.FC<TitleProps> = ({ input }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'p') {
        return (
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
            {domToReact(domNode.children, options)}
          </h1>
        )
      }

      if (domNode instanceof Element && domNode.name === 'strong') {
        return (
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent xl:inline">
            {domToReact(domNode.children, options)}
          </span>
        )
      }
    },
  }

  return <>{parse(input, options)}</>
}
