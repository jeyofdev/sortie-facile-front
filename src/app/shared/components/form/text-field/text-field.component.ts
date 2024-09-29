import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
	styleUrl: './text-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
})
export class TextFieldComponent extends FormInputControlValueAccessor {
	@Input({ required: true }) type!: 'text' | 'email';

	onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;

		this.onChanged(this.value);
	}
}
