import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@services/dark-mode.service';
import { Position } from '@shared/types/position.type';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	visible: boolean = false;
	position: Position = 'right';
	items: MenuItem[] | undefined;

	constructor(private darkModeService: DarkModeService) {}

	ngOnInit() {
		this.darkModeService.initDarkMode();
		this.items = [
			{
				items: [
					{
						label: 'Signin',
					},
					{
						label: 'Signup',
					},
				],
			},
		];
	}

	toggleDarkMode() {
		this.darkModeService.toggleDarkMode();
	}

	showDialog() {
		this.visible = true;
	}

	onHide() {
		this.visible = false;
	}
}
