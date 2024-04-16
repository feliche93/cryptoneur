ALTER TABLE "blockchains" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "blockchains" ADD COLUMN "slug" text NOT NULL;