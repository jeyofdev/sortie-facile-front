import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
	selector: 'app-account-settings-interests-page',
	templateUrl: './account-settings-interests-page.component.html',
	styleUrl: './account-settings-interests-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsInterestsPageComponent {
	userInterests!: CountAndResult<ResponseInterestBase>;

	constructor(protected _activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this._activatedRoute.parent?.data.pipe(first()).subscribe(data => {
			this.userInterests = data['profile']?.categories;
		});

		console.log(this.userInterests);
	}
}
