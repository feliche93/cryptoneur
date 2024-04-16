CREATE TABLE IF NOT EXISTS "blockchains" (
	"id" text PRIMARY KEY DEFAULT 'bc_' || nanoid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"old_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
