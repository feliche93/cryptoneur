CREATE TABLE IF NOT EXISTS "fiat_currencies" (
	"id" text PRIMARY KEY DEFAULT 'fiat_' || nanoid() NOT NULL,
	"old_id" integer NOT NULL,
	"name" text NOT NULL,
	"symbol" text NOT NULL,
	"sign" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "fiat_currencies_old_id_unique" UNIQUE("old_id")
);
