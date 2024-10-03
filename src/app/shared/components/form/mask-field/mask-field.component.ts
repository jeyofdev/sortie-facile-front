import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';

@Component({
	selector: 'app-mask-field',
	templateUrl: './mask-field.component.html',
	styleUrl: './mask-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaskFieldComponent),
			multi: true,
		},
	],
})
export class MaskFieldComponent extends FormInputControlValueAccessor implements OnInit {
	@Input({ required: true }) type!: 'date' | 'phone';

	mask!: string;

	override ngOnInit(): void {
		super.ngOnInit();

		if (this.type === 'date') {
			this.mask = '99/99/9999';
			this.placeholder = '01/10/2000';
		} else if (this.type === 'phone') {
			this.mask = '99-99-99-99-99';
			this.placeholder = '99-99-99-99-99';
		}
	}

	override onInputChange(event: Event): void {
		this.value = (event.target as HTMLInputElement).value;

		if (this.disabled) {
			return;
		}

		this.onChanged(this.value);
	}
}
