create table "public"."posts" (
    "id" character varying not null,
    "created_at" timestamp with time zone default now(),
    "author_id" character varying not null,
    "text" text not null,
    "is_relevant" boolean default false,
    "is_comment_generated" boolean default false
);


alter table "public"."posts" enable row level security;

alter table "public"."authors" drop column "author_id";

alter table "public"."authors" alter column "id" drop identity;

alter table "public"."authors" alter column "id" set data type character varying using "id"::character varying;

CREATE UNIQUE INDEX authors_pkey ON public.authors USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX providers_pkey ON public.providers USING btree (id);

alter table "public"."authors" add constraint "authors_pkey" PRIMARY KEY using index "authors_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."providers" add constraint "providers_pkey" PRIMARY KEY using index "providers_pkey";

alter table "public"."authors" add constraint "authors_provider_id_fkey" FOREIGN KEY (provider_id) REFERENCES providers(id) not valid;

alter table "public"."authors" validate constraint "authors_provider_id_fkey";

alter table "public"."posts" add constraint "posts_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(id) not valid;

alter table "public"."posts" validate constraint "posts_author_id_fkey";


