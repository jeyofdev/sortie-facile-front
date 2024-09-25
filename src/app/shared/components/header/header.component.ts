import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@services/dark-mode.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	constructor(private darkModeService: DarkModeService) {}

	ngOnInit() {
		this.darkModeService.initDarkMode();
	}

	toggleDarkMode() {
		this.darkModeService.toggleDarkMode();
	}
}
