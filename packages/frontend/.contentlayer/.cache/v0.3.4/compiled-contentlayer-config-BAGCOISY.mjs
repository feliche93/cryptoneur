// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  locale: {
    type: "enum",
    of: ["en", "de", null],
    resolve: (doc) => {
      const locale = doc._raw.flattenedPath.split("/")[0];
      return ["en", "de"].includes(locale) ? locale : null;
    }
  }
};
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `**/pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      description: "The title of the post",
      type: "string",
      required: true
    },
    description: {
      description: "The description of the post",
      type: "string"
    },
    metaTitle: {
      description: "The meta title",
      type: "string"
    },
    metaDescription: {
      description: "The meta description",
      type: "string"
    },
    keywords: {
      description: "Keywords for blogpost",
      type: "list",
      of: { type: "string" }
    },
    date: {
      type: "date",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    featured: {
      type: "boolean",
      default: false
    },
    image: {
      type: "string",
      required: false
    }
  },
  computedFields
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/blog/**/*.mdx`,
  // This line was changed
  contentType: "mdx",
  fields: {
    title: {
      description: "The title of the post",
      type: "string",
      required: true
    },
    description: {
      description: "The description of the post",
      type: "string"
    },
    metaTitle: {
      description: "The meta title",
      type: "string"
    },
    metaDescription: {
      description: "The meta description",
      type: "string"
    },
    keywords: {
      description: "Keywords for blogpost",
      type: "list",
      of: { type: "string" }
    },
    date: {
      type: "date",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    featured: {
      type: "boolean",
      default: false
    },
    image: {
      type: "string",
      required: true
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true
    },
    categories: {
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  postAccess: {
    type: "enum",
    of: ["public", "membersOnly", "paidMembersOnly", "specificTiers"],
    default: "public",
    required: true
  },
  computedFields
}));
var Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    avatar: {
      type: "string",
      required: true
    },
    twitter: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Author,
  Page,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-BAGCOISY.mjs.map
