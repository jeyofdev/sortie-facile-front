import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@services/dark-mode.service';
import { HeaderService } from '@services/header.service';
import { Position } from '@shared/types/position.type';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	visible: boolean = false;
	position: Position = 'right';
	items$!: Observable<any>;

	constructor(
		private darkModeService: DarkModeService,
		private headerService: HeaderService,
	) {}

	ngOnInit() {
		this.darkModeService.initDarkMode();
		this.items$ = this.headerService.items$;
	}

	toggleDarkMode() {
		this.darkModeService.toggleDarkMode();
	}

	onHide() {
		this.visible = false;
	}

	showBookingsDialog() {
		this.visible = true;
	}
}
