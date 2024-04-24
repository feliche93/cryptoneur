CREATE TABLE IF NOT EXISTS "grant_categories" (
	"id" text PRIMARY KEY DEFAULT 'gcat_' || nanoid() NOT NULL,
	"grant_id" text,
	"category_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_categories" ADD CONSTRAINT "grant_categories_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_categories" ADD CONSTRAINT "grant_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
