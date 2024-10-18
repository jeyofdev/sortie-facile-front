import { Directive, OnInit } from '@angular/core';
import { AuthPageGlobalAbstract } from './auth-page-global.abstract';
import { AbstractControl } from '@angular/forms';
import { ResponseProfile } from '@shared/models/profile/response/response-profile.model';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Directive()
export abstract class AccountSettingsPageAbstract<T extends { [key: string]: AbstractControl<any, any> }>
	extends AuthPageGlobalAbstract<T>
	implements OnInit
{
	resolvedProfile!: ResponseProfile;

	constructor(protected _activatedRoute: ActivatedRoute) {
		super();
	}

	ngOnInit(): void {
		this._activatedRoute.parent?.data.pipe(first()).subscribe(data => {
			this.resolvedProfile = data['profile'];
		});

		this.initFormControls();
		this.initMainForm();
	}

	abstract onSubmit(): void;

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;
}
