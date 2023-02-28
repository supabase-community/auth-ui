import type { BaseAppearance } from '@supabase/auth-ui-shared';

export interface Appearance extends BaseAppearance {
	style?: {
		anchor?: string;
		button?: string;
		container?: string;
		divider?: string;
		input?: string;
		label?: string;
		loader?: string;
		message?: string;
	};
}

export interface AuthSettings {
	external?: {
		apple?: boolean;
		azure?: boolean;
		bitbucket?: boolean;
		discord?: boolean;
		github?: boolean;
		gitlab?: boolean;
		keycloak?: boolean;
		google?: boolean;
		linkedin?: boolean;
		facebook?: boolean;
		notion?: boolean;
		spotify?: boolean;
		slack?: boolean;
		workos?: boolean;
		twitch?: boolean;
		twitter?: boolean;
		email?: boolean;
		phone?: boolean;
		saml?: boolean;
		zoom?: boolean;
	};
	disable_signup?: boolean;
	mailer_autoconfirm?: boolean;
	phone_autoconfirm?: boolean;
	sms_provider?: string;
}
