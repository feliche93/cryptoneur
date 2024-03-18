CREATE TABLE IF NOT EXISTS "transaction_types" (
	"id" text PRIMARY KEY DEFAULT 'txn_type_' || nanoid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"gas" integer NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transaction_types_name_idx" ON "transaction_types" ("name");