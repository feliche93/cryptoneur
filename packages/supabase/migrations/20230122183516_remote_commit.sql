alter table "public"."grants" add column "twitter" character varying;

alter table "public"."grants" alter column "logo" set not null;

alter table "public"."grants" alter column "slug" set not null;


