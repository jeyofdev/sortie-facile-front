import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-auth-profile-layout',
	templateUrl: './auth-profile-layout.component.html',
	styleUrl: './auth-profile-layout.component.scss',
})
export class AuthProfileLayoutComponent implements OnInit {
	@Input({ required: true }) imgSrc!: string;
	@Input({ required: true }) imgAlt!: string;
	@Input({ required: true }) pageTitle!: string;
	@Input({ required: true }) pageIcon!: string;

	iconClass: string = 'pi';

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.pageIcon;
	}
}
