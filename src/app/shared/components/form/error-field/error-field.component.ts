import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { ValidationMessage } from '@shared/types/validation-message.type';

@Component({
	selector: 'app-error-field',
	templateUrl: './error-field.component.html',
	styleUrl: './error-field.component.scss',
})
export class ErrorFieldComponent {
	@Input({ required: true }) form!: FormGroupDirective;
	@Input({ required: true }) control!: AbstractControl<any, any> | null;
	@Input({ required: true }) controlName!: string;
	@Input({ required: true }) validationMessage!: ValidationMessage | null;
}
