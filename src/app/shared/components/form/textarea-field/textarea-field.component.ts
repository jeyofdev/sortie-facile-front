import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';

@Component({
	selector: 'app-textarea-field',
	templateUrl: './textarea-field.component.html',
	styleUrl: './textarea-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaFieldComponent),
			multi: true,
		},
	],
})
export class TextareaFieldComponent extends FormInputControlValueAccessor {
	@Input({ required: true }) rows!: number;
	@Input({ required: true }) cols!: number;

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;

		this.onChanged(this.value);
	}
}
