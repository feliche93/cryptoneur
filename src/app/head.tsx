import { NextSeo } from "next-seo";
import type { NextSeoProps } from "next-seo";

import { NEXT_SEO_DEFAULT } from "../../next-seo.config"; // your path will vary

export default async function Head() {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: "Home",
  };
  return <NextSeo {...updateMeta} useAppDir={true} />;
}
