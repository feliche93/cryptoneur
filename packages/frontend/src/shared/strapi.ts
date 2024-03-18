import Strapi, { StrapiOptions } from 'strapi-sdk-js'

const options: StrapiOptions = {
  url: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  axiosOptions: {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  },
}

const strapi = new Strapi(options)

const getGrantbySlug = async (slug: string, populate: string) => {
  const { data: grants } = await strapi.find<any>('grants', {
    populate,
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  if (!grants?.length) {
    return null
  }

  const grant = grants[0]

  return grant
}

export { getGrantbySlug, strapi }

// async function getBlogPosts() {
//     const { data, meta } = await strapi.find('blog-posts', {
//         populate:
//     });
// }
// export default strapi;

// async function getStrapiData() {

//     try {
//         const { data, meta } = await strapi.findOne('posts', 1, {
//             populate: "deep"
//         });
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }

// }

// getStrapiData();
