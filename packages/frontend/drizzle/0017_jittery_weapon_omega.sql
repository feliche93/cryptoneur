CREATE TABLE IF NOT EXISTS "grants" (
	"id" text PRIMARY KEY DEFAULT 'gr' || nanoid() NOT NULL,
	"old_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"url_application" text NOT NULL,
	"url_info" text NOT NULL,
	"content" text,
	"slug" text NOT NULL,
	"funding_amount_min" integer NOT NULL,
	"funding_amount_max" integer NOT NULL,
	"funding_amount_currency" text NOT NULL,
	"github_url" text,
	"twitter_url" text,
	"discord_url" text,
	"website_url" text,
	"logo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "grants_old_id_unique" UNIQUE("old_id"),
	CONSTRAINT "grants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "use_cases" ALTER COLUMN "id" SET DEFAULT 'uc' || nanoid();--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "grants_name_idx" ON "grants" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grants" ADD CONSTRAINT "grants_funding_amount_currency_currencies_id_fk" FOREIGN KEY ("funding_amount_currency") REFERENCES "currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
