import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  locale: {
    type: 'enum',
    of: ['en', 'de', null],
    resolve: (doc) => {
      const locale = doc._raw.flattenedPath.split('/')[0]
      return ['en', 'de'].includes(locale) ? locale : null
    },
  },
}

// export const Page = defineDocumentType(() => ({
//   name: 'Page',
//   filePathPattern: `pages/**/*.mdx`,
//   contentType: 'mdx',
//   fields: {
//     title: {
//       type: 'string',
//       required: true,
//     },
//     description: {
//       type: 'string',
//     },
//   },
//   computedFields,
// }))

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `**/pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      description: 'The title of the post',
      type: 'string',
      required: true,
    },
    description: {
      description: 'The description of the post',
      type: 'string',
    },
    metaTitle: {
      description: 'The meta title',
      type: 'string',
    },
    metaDescription: {
      description: 'The meta description',
      type: 'string',
    },
    keywords: {
      description: 'Keywords for blogpost',
      type: 'list',
      of: { type: 'string' },
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields,
}))

// export const Doc = defineDocumentType(() => ({
//   name: 'Doc',
//   filePathPattern: `docs/**/*.mdx`,
//   contentType: 'mdx',
//   fields: {
//     title: {
//       type: 'string',
//       required: true,
//     },
//     description: {
//       type: 'string',
//     },
//     published: {
//       type: 'boolean',
//       default: true,
//     },
//   },
//   computedFields,
// }))

// export const Guide = defineDocumentType(() => ({
//   name: 'Guide',
//   filePathPattern: `guides/**/*.mdx`,
//   contentType: 'mdx',
//   fields: {
//     title: {
//       type: 'string',
//       required: true,
//     },
//     description: {
//       type: 'string',
//     },
//     date: {
//       type: 'date',
//       required: true,
//     },
//     published: {
//       type: 'boolean',
//       default: true,
//     },
//     featured: {
//       type: 'boolean',
//       default: false,
//     },
//   },
//   computedFields,
// }))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/blog/**/*.mdx`, // This line was changed
  contentType: 'mdx',
  fields: {
    title: {
      description: 'The title of the post',
      type: 'string',
      required: true,
    },
    description: {
      description: 'The description of the post',
      type: 'string',
    },
    metaTitle: {
      description: 'The meta title',
      type: 'string',
    },
    metaDescription: {
      description: 'The meta description',
      type: 'string',
    },
    keywords: {
      description: 'Keywords for blogpost',
      type: 'list',
      of: { type: 'string' },
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    image: {
      type: 'string',
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    categories: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  postAccess: {
    type: 'enum',
    of: ['public', 'membersOnly', 'paidMembersOnly', 'specificTiers'],
    default: 'public',
    required: true,
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: `authors/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    avatar: {
      type: 'string',
      required: true,
    },
    twitter: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Author, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
