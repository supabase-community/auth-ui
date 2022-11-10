import type { Provider } from '@supabase/supabase-js';
import type { AuthSettings } from './types';

const socialProviders: Provider[] = [
	'apple',
	'azure',
	'bitbucket',
	'discord',
	'facebook',
	'github',
	'gitlab',
	'google',
	'keycloak',
	'linkedin',
	'notion',
	'slack',
	'spotify',
	'twitch',
	'twitter',
	'workos'
];

export function getSocialProvidersFromAuthSettings(settings: AuthSettings) {
	return Object.entries(settings?.external ?? {})
		.filter(([key, value]) => value && socialProviders.includes(key as Provider))
		.map(([key]) => key) as Provider[];
}
