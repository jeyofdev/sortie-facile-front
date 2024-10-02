import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormGroupDirective } from '@angular/forms';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Directive()
export abstract class FormInputControlValueAccessor implements OnInit, ControlValueAccessor {
	@Input({ required: true }) labelFor!: string;
	@Input({ required: true }) label!: string;
	@Input() icon!: string;
	@Input({ required: true }) id!: string;
	@Input({ required: true }) name!: string;
	@Input() placeholder!: string;
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

	abstract onInputChange(event: Event | InputNumberInputEvent | DropdownChangeEvent): void;

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
