import type { SocialLayout } from '@supabase/auth-ui-shared';
import { writable } from 'svelte/store';

export const customButtonColor = writable('rgb(202, 37, 37)');
export const customBorderRadius = writable('5px');
export const customTheme = writable('dark');
export const customSocialLayout = writable<SocialLayout>('horizontal');
