alter table "public"."grants" drop column "twitter";

CREATE UNIQUE INDEX grants_name_key ON public.grants USING btree (name);

alter table "public"."grants" add constraint "grants_name_key" UNIQUE using index "grants_name_key";


