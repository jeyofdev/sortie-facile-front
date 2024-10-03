import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-field',
	templateUrl: './number-field.component.html',
	styleUrl: './number-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldComponent),
			multi: true,
		},
	],
})
export class NumberFieldComponent extends FormInputControlValueAccessor {
	@Input() mode: 'decimal' | 'currency' = 'decimal';
	@Input() useGrouping: boolean = false;

	override onInputChange(event: InputNumberInputEvent): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(String(event.value));
	}
}
