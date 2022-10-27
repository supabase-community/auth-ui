export enum AuthView {
	SIGN_IN = 'sign_in',
	SIGN_UP = 'sign_up',
	MAGIC_LINK = 'magic_link',
	FORGOTTEN_PASSWORD = 'forgotten_password',
	UPDATE_PASSWORD = 'update_password'
}

export interface Localization {
	[key: string]: I18nVariables;
	['en']: I18nVariables;
	['de']: I18nVariables;
	['ja']: I18nVariables;
}

export type I18nVariables = {
	sign_up?: {
		email_label?: string;
		password_label?: string;
		button_label?: string;
		social_provider_text?: string;
		link_text?: string;
	};
	sign_in?: {
		email_label?: string;
		password_label?: string;
		button_label?: string;
		social_provider_text?: string;
		link_text?: string;
	};
	magic_link?: {
		email_input_label?: string;
		email_input_placeholder?: string;
		button_label?: string;
		link_text?: string;
	};
	forgotten_password?: {
		email_label?: string;
		password_label?: string;
		button_label?: string;
		link_text?: string;
	};
	update_password?: {
		password_label?: string;
		password_input_placeholder?: string;
		button_label?: string;
	};
};

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
