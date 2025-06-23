import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractVideoId(url: string): string | null {
	try {
		const standardUrl = url.match(/(?:youtube\.com\/watch\?v=)([^&]+)/);
		if (standardUrl) return standardUrl[1];

		const shortUrl = url.match(/(?:youtu\.be\/)([^?]+)/);
		if (shortUrl) return shortUrl[1];

		const embedUrl = url.match(/(?:youtube\.com\/embed\/)([^?]+)/);
		if (embedUrl) return embedUrl[1];

		return null;
	} catch (error) {
		console.error("Error extracting video ID:", error);
		return null;
	}
}

export function truncateText(text: string, maxLength: number): string {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + "...";
	}
	return text;
}

export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} catch (error) {
		console.error("Error formatting date:", error);
		return dateString;
	}
}

export function isValidYoutubeUrl(url: string): boolean {
	const youtubeRegex =
		/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}/;
	return youtubeRegex.test(url);
}
