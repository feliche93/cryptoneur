import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetUrl(id: string) {
    if (!id) throw new Error("Asset ID is required");
    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
}