import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from '$app/environment';
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";
import { DATABASE_URL } from '$env/static/private'


const sql = postgres(DATABASE_URL);
export const auth = lucia({
    adapter: postgresAdapter(sql, {
        user: 'auth_user',
        session: 'user_session',
        key: 'user_key'
    }),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),

    getUserAttributes: (data) => {
        return {
            email: data.email
        };
    }
});

export type Auth = typeof auth;