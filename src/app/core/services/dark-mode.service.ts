import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DarkModeService {
	private darkMode = false;

	initDarkMode(): void {
		const savedTheme = localStorage.getItem('theme') || 'light';
		const themeLink = document.getElementById(
			'theme-css',
		) as HTMLLinkElement;

		themeLink.href = `assets/theme/css/${savedTheme}/theme.css`;

		this.darkMode = savedTheme.includes('dark');
	}

	toggleDarkMode() {
		this.darkMode = !this.darkMode;
		const newTheme = this.darkMode ? 'dark' : 'light';
		localStorage.setItem('theme', newTheme);

		const themeLink = document.getElementById(
			'theme-css',
		) as HTMLLinkElement;

		themeLink.href = `assets/theme/css/${newTheme}/theme.css`;
	}
}
