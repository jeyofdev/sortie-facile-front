import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationMessage } from '@shared/types/validation-message.type';

@Component({
	selector: 'app-password-field',
	templateUrl: './password-field.component.html',
	styleUrl: './password-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordFieldComponent),
			multi: true,
		},
	],
})
export class PasswordFieldComponent implements OnInit {
	@Input() labelFor!: string;
	@Input() label!: string;
	@Input() icon!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() placeholder!: string;
	@Input() feedback!: boolean;
	@Input() toggleMask!: boolean;
	@Input({ required: true }) form!: FormGroupDirective;
	@Input({ required: true }) parentForm!: FormGroup;
	@Input() groupName!: string;
	@Input({ required: true }) controlName!: string;
	@Input({ required: true }) validationMessage!: ValidationMessage | null;

	iconClass: string = 'pi';
	value!: string;
	disabled!: boolean;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.icon;
		this.disabled = false;
	}

	onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		console.log(this.value);

		this.onChanged(this.value);
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	markAsTouched(): void {
		this.onTouched();
	}

	getFormControl(groupName: string, parentForm: FormGroup, controlName: string) {
		if (groupName) {
			const group = parentForm.get(groupName) as FormGroup;
			return group ? group.get(controlName) : null;
		} else {
			return parentForm.get(controlName);
		}
	}

	get control(): AbstractControl<any, any> | null {
		return this.getFormControl(this.groupName || '', this.parentForm, this.name);
	}
}
