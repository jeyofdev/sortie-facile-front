import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-input-search',
	templateUrl: './input-search.component.html',
	styleUrl: './input-search.component.scss',
})
export class InputSearchComponent implements OnInit {
	iconClass: string = 'pi';

	@Input({ required: true }) icon!: string;
	@Input() iconPosition!: 'right' | 'left';

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.icon;
	}
}
