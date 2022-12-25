import { AxiosRequestConfig } from "axios";
import Strapi, { StrapiOptions } from "strapi-sdk-js"

const options: StrapiOptions = {
    url: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    axiosOptions: {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        },
    }
};

const strapi = new Strapi(options);

export { strapi };

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