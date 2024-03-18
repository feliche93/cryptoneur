CREATE TABLE IF NOT EXISTS "currencies" (
	"id" text PRIMARY KEY DEFAULT 'cur_' || nanoid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"symbol" varchar(256) NOT NULL,
	"sign" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "created_by_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "slug_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "currencies_name_idx" ON "currencies" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "currencies_symbol_idx" ON "currencies" ("symbol");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organizations_created_by_idx" ON "organizations" ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organizations_name_idx" ON "organizations" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organizations_slug_idx" ON "organizations" ("slug");