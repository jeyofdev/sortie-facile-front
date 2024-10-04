import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-form-button-box',
	templateUrl: './form-button-box.component.html',
	styleUrl: './form-button-box.component.scss',
})
export class FormButtonBoxComponent {
	@Input() showPreviousBtn!: boolean;
	@Output() previousClick = new EventEmitter<void>();

	onClick(): void {
		this.previousClick.emit();
	}
}
