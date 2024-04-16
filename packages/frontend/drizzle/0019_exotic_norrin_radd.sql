ALTER TABLE "grants" ALTER COLUMN "funding_amount_min" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "grants" ALTER COLUMN "funding_amount_max" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "grants" ALTER COLUMN "funding_amount_currency" DROP NOT NULL;