import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
	@Input() items!: MenuItem[];
	@Input() title!: string;
}
