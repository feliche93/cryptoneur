ALTER TABLE "categories" ADD COLUMN "old_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_old_id_unique" UNIQUE("old_id");