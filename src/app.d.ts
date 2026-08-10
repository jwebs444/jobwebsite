// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		turnstile?: {
			render: (
				selector: string,
				options: {
					sitekey: string;
					action?: string;
					theme?: 'light' | 'dark' | 'auto';
					size?: 'normal' | 'flexible' | 'compact';
					appearance?: 'always' | 'execute' | 'interaction-only';
					callback?: (token: string) => void;
					'error-callback'?: (code?: string) => void;
					'expired-callback'?: () => void;
					'timeout-callback'?: () => void;
				}
			) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId: string) => void;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Record<string, string | undefined>;
		}
	}
}

export {};
