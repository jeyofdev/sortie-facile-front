import { DarkModeService } from './../../../core/services/dark-mode.service';
import { Component, OnInit } from '@angular/core';

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
