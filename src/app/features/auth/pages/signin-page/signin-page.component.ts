import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
		this.formIsSubmitted = true;

		for (const control in this.loginForm.controls) {
			this.loginForm.controls[control].markAsTouched();
		}

		console.log(this.loginForm.value);
	}

	private initLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern(this.regexEmail)]);
		this.passwordCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(8)]);
	}
}
