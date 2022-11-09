import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);

	const langHeader = event.request.headers.get('accept-language');
	const lang = langHeader?.split(';')[0].split(',')[0].split('-')[0] ?? undefined;

	return {
		lang,
		session
	};
};
