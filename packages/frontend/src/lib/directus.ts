"server-only"

import { Directus } from "@directus/sdk";
import { cache } from "react";
import { DirectusCollections } from "./directus-collections";

const directus = new Directus<DirectusCollections>(
    process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
);


export default directus;