ALTER TABLE "blockchains" ADD COLUMN "old_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "blockchains" ADD CONSTRAINT "blockchains_old_id_unique" UNIQUE("old_id");