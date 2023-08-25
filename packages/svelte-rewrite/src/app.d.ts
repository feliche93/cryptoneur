// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type DatabaseUserAttributes = {
		email: string;
	};
	type DatabaseSessionAttributes = {};
}

declare module 'svelte-share-buttons-component' {
	export interface EmailProps {
		subject: string;
		body: string;
	}
	export const Email: SvelteComponentTyped<EmailProps>;

	export interface HackerNewsProps {
		title: string;
		url: string;
		class?: string;
	}
	export const HackerNews: SvelteComponentTyped<HackerNewsProps>;

	// ... more components
}

export { };
