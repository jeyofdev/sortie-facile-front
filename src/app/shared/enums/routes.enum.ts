export enum PrimaryRouteEnum {
	HOME = '',
	AUTH = 'auth',
	PROFILE = 'profile',
	NOT_FOUND = '**',
	ACCOUNT = 'account',
}

export enum AuthRouteEnum {
	SIGNIN = 'signin',
	SIGNUP = 'signup',
	FORGOT_PASSWORD = 'forgot-password',
	RESET_PASSWORD = 'reset-password',
	CHECK_EMAIL = 'check-email',
	VERIFICATION_ACCOUNT = 'verification-account',
}

export enum AuthProfileRouteEnum {
	PERSONAL = 'personal',
	ADDRESS = 'address',
	CONTACT = 'contact',
	DESCRIPTION = 'description',
	INTERESTS = 'interests',
}

export enum AccountRouteEnum {
	HOME = 'home',
	FAVORITES = 'favorites',
	ACTIVITIES = 'activities',
	MESSAGES = 'messages',
	SETTINGS = 'settings',
}

export enum SettingsRouteEnum {
	PROFILE = 'profile',
	CONTACT = 'contact',
	DESCRIPTION = 'description',
	INTERESTS = 'interests',
	PASSWORD = 'password',
}

export enum ActivityRouteEnum {
	CREATE = 'create',
}
