import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ platform }) => {
	const runtimeEnv = platform?.env as Record<string, string | undefined> | undefined;

	return {
		turnstileSiteKey: runtimeEnv?.PUBLIC_TURNSTILE_SITE_KEY ?? ''
	};
};
