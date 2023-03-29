import "server-only"

import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@lib/database.types";
import { cache } from "react";


export const createServerClient = cache(() =>
    createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    }));