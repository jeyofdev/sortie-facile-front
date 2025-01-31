import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Text } from '@utils/text.utils';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-activity-layout',
	templateUrl: './activity-layout.component.html',
	styleUrl: './activity-layout.component.scss',
	providers: [ConfirmationService],
})
export class ActivityLayoutComponent implements OnInit {
	@Input({ required: true }) activityList$!: Observable<ResponseActivity[]>;
	@Input({ required: true }) subtitle!: string;

	breadcrumbItems!: MenuItem[];
	layout!: 'list' | 'grid';
	interest!: string | null;

	constructor(private _router: Router) {}

	ngOnInit(): void {
		this._router.events.subscribe(() => {
			const fullPath = this._router.url.split('/');

			// récupérer l'id de l'utilisateur connecté

			this.breadcrumbItems = fullPath.map((path: string) => {
				const normalizedPath = Text.normalizeString(path);
				return {
					label:
						normalizedPath === ''
							? 'Home'
							: normalizedPath
									.split(' ')
									.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(' '),
					routerLink: `/${normalizedPath}`,
				};
			});

			if (fullPath.length > 2) {
				this.interest = fullPath[2]
					.replace(/-/g, ' ')
					.split(' ')
					.map((e: string) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
					.join(' ');
			} else {
				this.interest = null;
			}
		});

		this.layout = 'grid';
	}
}
