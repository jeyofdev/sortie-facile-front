import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-auth-layout',
	templateUrl: './auth-layout.component.html',
	styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
	@Input({ required: true }) imgSrc!: string;
	@Input({ required: true }) imgAlt!: string;
	@Input({ required: true }) pageTitle!: string;
	@Input({ required: true }) pageIcon!: string;

	iconClass: string = 'pi';

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.pageIcon;
	}
}
