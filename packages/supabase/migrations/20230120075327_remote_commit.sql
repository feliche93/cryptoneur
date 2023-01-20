alter table "public"."blockchains" drop constraint "blockchains_blockchain_key";

alter table "public"."categories" drop constraint "categories_category_key";

alter table "public"."use_cases" drop constraint "use_cases_use_case_key";

drop index if exists "public"."blockchains_blockchain_key";

drop index if exists "public"."categories_category_key";

drop index if exists "public"."use_cases_use_case_key";

alter table "public"."blockchains" drop column "blockchain";

alter table "public"."blockchains" add column "name" character varying;

alter table "public"."categories" drop column "category";

alter table "public"."categories" add column "name" character varying not null;

alter table "public"."grants" drop column "grant";

alter table "public"."grants" add column "name" character varying not null;

alter table "public"."queries" add column "name" character varying;

alter table "public"."use_cases" drop column "use_case";

alter table "public"."use_cases" add column "name" character varying not null;

CREATE UNIQUE INDEX blockchains_blockchain_key ON public.blockchains USING btree (name);

CREATE UNIQUE INDEX categories_category_key ON public.categories USING btree (name);

CREATE UNIQUE INDEX use_cases_use_case_key ON public.use_cases USING btree (name);

alter table "public"."blockchains" add constraint "blockchains_blockchain_key" UNIQUE using index "blockchains_blockchain_key";

alter table "public"."categories" add constraint "categories_category_key" UNIQUE using index "categories_category_key";

alter table "public"."use_cases" add constraint "use_cases_use_case_key" UNIQUE using index "use_cases_use_case_key";


