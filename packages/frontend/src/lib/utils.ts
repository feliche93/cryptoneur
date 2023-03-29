import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getAssetUrl(id: string) {
    if (!id) return null;
    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
}