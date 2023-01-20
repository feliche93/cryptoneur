alter table "public"."grant_blockchains" drop constraint "grant_blockchains_pkey";

alter table "public"."grant_categories" drop constraint "grant_categories_pkey";

alter table "public"."grant_use_cases" drop constraint "grant_use_cases_pkey";

drop index if exists "public"."grant_blockchains_pkey";

drop index if exists "public"."grant_categories_pkey";

drop index if exists "public"."grant_use_cases_pkey";

CREATE UNIQUE INDEX grant_blockchains_pkey ON public.grant_blockchains USING btree (grant_id, blockchain_id);

CREATE UNIQUE INDEX grant_categories_pkey ON public.grant_categories USING btree (category_id, grant_id);

CREATE UNIQUE INDEX grant_use_cases_pkey ON public.grant_use_cases USING btree (use_case_id, grant_id);

alter table "public"."grant_blockchains" add constraint "grant_blockchains_pkey" PRIMARY KEY using index "grant_blockchains_pkey";

alter table "public"."grant_categories" add constraint "grant_categories_pkey" PRIMARY KEY using index "grant_categories_pkey";

alter table "public"."grant_use_cases" add constraint "grant_use_cases_pkey" PRIMARY KEY using index "grant_use_cases_pkey";


