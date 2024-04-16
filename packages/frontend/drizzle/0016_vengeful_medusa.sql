CREATE TABLE IF NOT EXISTS "use_cases" (
	"id" text PRIMARY KEY DEFAULT 'use_case_' || nanoid() NOT NULL,
	"old_id" integer NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "use_cases_old_id_unique" UNIQUE("old_id"),
	CONSTRAINT "use_cases_slug_unique" UNIQUE("slug")
);
