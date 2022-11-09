import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import type { AuthSettings } from '$lib';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
		headers: {
			apikey: env.PUBLIC_SUPABASE_ANON_KEY
		}
	});
	const settings: AuthSettings = await res.json();
	return json(settings);
};
