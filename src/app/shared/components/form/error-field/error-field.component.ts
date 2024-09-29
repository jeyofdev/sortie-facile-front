import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-error-field',
	templateUrl: './error-field.component.html',
	styleUrl: './error-field.component.scss',
})
export class ErrorFieldComponent {
	@Input({ required: true }) formIsSubmitted!: boolean;
	@Input({ required: true }) form!: FormGroup<any>;
	@Input({ required: true }) controlName!: string;
	@Input({ required: true }) validationMessage!: any;
}
