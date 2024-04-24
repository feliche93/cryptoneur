CREATE TABLE IF NOT EXISTS "grant_blockchains" (
	"id" text PRIMARY KEY DEFAULT 'gbc_' || nanoid() NOT NULL,
	"grant_id" text,
	"blockchain_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_blockchains" ADD CONSTRAINT "grant_blockchains_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_blockchains" ADD CONSTRAINT "grant_blockchains_blockchain_id_blockchains_id_fk" FOREIGN KEY ("blockchain_id") REFERENCES "blockchains"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
