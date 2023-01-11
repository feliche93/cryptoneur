alter table "public"."grants" drop constraint "grants_logo_fkey";

alter table "public"."grants" alter column "logo" set data type text using "logo"::text;

alter table "public"."grants" disable row level security;


