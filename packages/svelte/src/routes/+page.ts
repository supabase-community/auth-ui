import type { AuthSettings } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const settings: AuthSettings = await fetch('/api/auth/settings')
		.then((res) => res.json())
		.catch(() => ({}));

	return {
		authSettings: settings
	};
};
