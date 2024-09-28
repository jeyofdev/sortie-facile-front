import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent implements OnInit {
	formIsSubmitted: boolean = false;
	loginForm!: FormGroup;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;

	regexEmail!: RegExp;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.initFormControls();
		this.initLoginForm();
	}

	onSubmit(): void {
		console.log(this.loginForm.value);
	}

	private initLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
		this.emailCtrl = this.formBuilder.control('');
		this.passwordCtrl = this.formBuilder.control('');
	}
}
