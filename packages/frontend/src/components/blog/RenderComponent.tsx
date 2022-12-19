import { getTweets } from '@shared/getTweets'
import Image from 'next/image'
import { FC } from 'react'
import { EomjiCallout } from './EmojiCallout'
import { Tweet } from './Tweet'

export interface RenderComponentProps {
  component: any
}
export const RenderComponent: FC<RenderComponentProps> = async ({ component }) => {
  const { __component, id } = component

  switch (__component) {
    case 'shared.rich-text':
      return (
        <div
          key={id}
          className="prose-primary prose prose-lg mx-4 sm:mx-auto"
          dangerouslySetInnerHTML={{ __html: component?.markup }}
        />
      )
    case 'shared.tweet':
      // console.log({ component })
      const elements = component?.url.split('/')
      const elementLength = elements.length
      let tweetId = elements[elementLength - 1]
      tweetId = tweetId.split('?')[0]

      const tweets = await getTweets([tweetId])
      const [tweet] = tweets

      if (!!tweet) return <Tweet tweet={tweet} />

    // return <Tweet tweet={tweet} />

    case 'shared.emoji-callout':
      return <EomjiCallout text={component?.text} emoji={component?.emoji} type={component?.type} />

    case 'shared.image':
      const { media } = component
      // console.log(media?.data?.attributes)
      // console.log({ media })
      return (
        <figure>
          <div className="flex items-center justify-center">
            <Image
              src={media?.data?.attributes?.url}
              width={media?.data?.attributes?.width}
              height={media?.data?.attributes?.height}
              className="m-0 rounded-lg object-contain"
              alt={media?.data?.attributes?.alternativeText}
            />
          </div>
          {media?.data?.attributes?.caption && (
            <figcaption>{media?.data?.attributes?.caption}</figcaption>
          )}
        </figure>
      )

    default:
      return `❌ Unsupported block (${
        __component === 'unsupported' ? 'unsupported by Notion API' : __component
      })`
  }
}
