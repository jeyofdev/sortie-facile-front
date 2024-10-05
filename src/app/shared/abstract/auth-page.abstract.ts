import { Directive, OnInit } from '@angular/core';
import { AuthPageGlobalAbstract } from './auth-page-global.abstract';

@Directive()
export abstract class AuthPageAbstract extends AuthPageGlobalAbstract implements OnInit {
	redirectLink!: string;

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
