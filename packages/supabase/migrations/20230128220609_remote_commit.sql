alter table "public"."posts" add column "media" text;

alter table "public"."queries" add column "is_active" boolean not null default false;

alter table "public"."replies" add column "is_generated" boolean default false;


