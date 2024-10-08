import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/abstract/form-input-control-value-accessor.abstract';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
	selector: 'app-autocomplete-field',
	templateUrl: './autocomplete-field.component.html',
	styleUrl: './autocomplete-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteFieldComponent),
			multi: true,
		},
	],
})
export class AutocompleteFieldComponent extends FormInputControlValueAccessor {
	@Input({ required: true }) items!: unknown[];
	@Input() showClear: Boolean = false;

	@Output() selectedValueChange = new EventEmitter<any>();

	filteredItems!: unknown[];
	selectedCity: unknown | undefined;

	override onInputChange(event: AutoCompleteSelectEvent): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(event.value.id);
		this.selectedValueChange.emit(event.value);
	}

	filterItems(event: AutoCompleteCompleteEvent) {
		let filtered: any[] = [];
		let query = event.query;

		for (let i = 0; i < (this.items as any[]).length; i++) {
			let item = (this.items as any[])[i];

			if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}

		this.filteredItems = filtered;
	}
}
