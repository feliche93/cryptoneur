CREATE TABLE IF NOT EXISTS "grant_use_cases" (
	"id" text PRIMARY KEY DEFAULT 'guc_' || nanoid() NOT NULL,
	"grant_id" text,
	"use_case_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_use_cases" ADD CONSTRAINT "grant_use_cases_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_use_cases" ADD CONSTRAINT "grant_use_cases_use_case_id_use_cases_id_fk" FOREIGN KEY ("use_case_id") REFERENCES "use_cases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
