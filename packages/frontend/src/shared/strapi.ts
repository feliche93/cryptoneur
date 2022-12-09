import { AxiosRequestConfig } from "axios";
import Strapi, { StrapiOptions } from "strapi-sdk-js"

const options: StrapiOptions = {
    url: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    axiosOptions: {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
    }
};

const strapi = new Strapi(options);

export default strapi;

// async function getStrapiData() {
//     const { data, meta } = await strapi.findOne('products', 1, {
//         populate: [
//             "subscription",
//             "trial",
//             "features",
//         ]
//     });
//     console.log(data);
// }

// getStrapiData();