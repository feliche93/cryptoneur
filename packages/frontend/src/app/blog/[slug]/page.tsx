import { strapi } from '@shared/strapi'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Fragment } from 'react'

const renderComponent = (component) => {
  const { __component, id } = component
  // const value = component[__component]

  console.log({ component })

  switch (__component) {
    case 'shared.rich-text':
      return (
        <div
          key={id}
          className="prose-primary prose prose-lg mx-4 sm:mx-auto"
          dangerouslySetInnerHTML={{ __html: component?.markup }}
        />
      )
    // case 'paragraph':
    //   return (
    //     <p>
    //       <Text text={value.text} />
    //     </p>
    //   )
    // case 'heading_1':
    //   return (
    //     <h1>
    //       <Text text={value.text} />
    //     </h1>
    //   )
    // case 'heading_2':
    //   return (
    //     <h2>
    //       <Text text={value.text} />
    //     </h2>
    //   )
    // case 'heading_3':
    //   return (
    //     <h3>
    //       <Text text={value.text} />
    //     </h3>
    //   )
    // case 'numbered_list_item':
    //   return (
    //     <li>
    //       <Text text={value.text} />
    //     </li>
    //   )
    // case 'bulleted_list_item':
    //   return (
    //     <li>
    //       <Text text={value.text} />
    //     </li>
    //   )
    // case 'to_do':
    //   return (
    //     <div className="py-0.5">
    //       <label htmlFor={id}>
    //         <input
    //           className=" h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    //           type="checkbox"
    //           id={id}
    //           defaultChecked={value.checked}
    //         />{' '}
    //         <Text text={value.text} />
    //       </label>
    //     </div>
    //   )
    // case 'toggle':
    //   return (
    //     <details>
    //       <summary>
    //         <Text text={value.text} />
    //       </summary>
    //       {value.children?.map((block) => (
    //         <Fragment key={block.id}>{renderBlock(block)}</Fragment>
    //       ))}
    //     </details>
    //   )
    // case 'child_page':
    //   return <p>{value.title}</p>
    // case 'image':
    //   const src = value.type === 'external' ? value.external.url : value.file.url
    //   const caption = value?.caption
    //   // const caption = value?.caption[0] !== 'undefined' ? value.caption[0].plain_text : 'undefined';
    //   return (
    //     <>
    //       <figure className="relative m-0 aspect-video">
    //         <Image
    //           className="object-contain"
    //           // width={1200}
    //           // height={400}
    //           layout="fill"
    //           src={src}
    //           alt={caption}
    //         />
    //       </figure>
    //       {caption && (
    //         <div>
    //           <figcaption>{caption}</figcaption>
    //         </div>
    //       )}
    //     </>
    //   )
    // case 'quote':
    //   // console.log(value);
    //   return (
    //     <blockquote>
    //       <p>
    //         <Text text={value.text} />
    //       </p>
    //     </blockquote>
    //   )
    // case 'callout':
    //   // console.log(value);
    //   const icon = value.icon.emoji
    //   return (
    //     <div className="rounded-lg bg-gray-200 p-3 text-gray-900">
    //       <div className="flex justify-start">
    //         <div className="text-2xl">{icon}</div>
    //         <div className="ml-2">
    //           <Text text={value.text} />
    //         </div>
    //       </div>
    //     </div>
    //   )
    // case 'code':
    //   return <Basic code={value.text[0].plain_text} language={value.language} />
    // case 'embed':
    //   // Tweet Embedding
    //   if (value?.tweet !== 'undefined') {
    //     return <Tweet {...value.tweet} />
    //   }

    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
  }
}

export default async function BlogDetail({ params }) {
  const { slug } = params

  const { data: posts, meta } = await strapi.find('posts', {
    populate: 'deep',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  const [post] = posts

  console.log(post?.attributes?.content)

  return (
    <>
      <article className="mx-4 sm:mx-auto">
        <div className="flex items-center justify-center">
          <Image
            src={post?.attributes?.cover?.data?.attributes?.url}
            width={post?.attributes?.cover?.data?.attributes?.width}
            height={post?.attributes?.cover?.data?.attributes?.height}
            className="rounded-xl object-contain"
            priority={true}
            alt={post?.attributes?.cover?.data?.attributes?.alternativeText}
          />
        </div>
        <h1 className="mx-4 mt-2 block py-8 text-center text-4xl font-extrabold leading-8 tracking-tight text-gray-900 sm:mx-auto sm:max-w-3xl sm:text-5xl">
          {post?.attributes?.title}
        </h1>
        <div className="group flex items-center justify-center pb-6">
          <Image
            width={80}
            height={80}
            className="rounded-full object-contain"
            src={post?.attributes?.authors?.data[0].attributes?.avatar?.data?.attributes?.url}
            alt={post?.attributes?.authors?.data[0]?.attributes?.name}
          />
          <div className="ml-3">
            <div className="block text-xl font-medium text-gray-700">
              {post?.attributes?.authors?.name}
            </div>
            <div className="block text-base font-medium text-gray-600">
              {dayjs(post?.updatedAt).format('MMMM DD, YYYY')}
            </div>
          </div>
        </div>
        <section className="prose prose-lg prose-blue mx-4 bg-gray-100 text-gray-600 sm:mx-auto">
          {post?.attributes?.content.map((component) => (
            <Fragment key={component?.id}>{renderComponent(component)}</Fragment>
          ))}
        </section>
      </article>
    </>
  )
}
