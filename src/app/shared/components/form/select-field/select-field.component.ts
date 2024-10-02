import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';
import { Region } from '@shared/models/address/region.interface';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
	selector: 'app-select-field',
	templateUrl: './select-field.component.html',
	styleUrl: './select-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectFieldComponent),
			multi: true,
		},
	],
})
export class SelectFieldComponent extends FormInputControlValueAccessor {
	@Input() items!: unknown[];
	selectedCity: unknown | undefined;

	onInputChange(event: DropdownChangeEvent): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(event.value.name);
	}
}
