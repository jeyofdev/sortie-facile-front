import { Directive, OnInit } from '@angular/core';
import { AuthPageGlobalAbstract } from './auth-page-global.abstract';
import { AbstractControl } from '@angular/forms';

@Directive()
export abstract class AccountSettingsPageAbstract<T extends { [key: string]: AbstractControl<any, any> }>
	extends AuthPageGlobalAbstract<T>
	implements OnInit
{
	constructor() {
		super();
	}

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	abstract onSubmit(): void;

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;
}
