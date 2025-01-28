import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-button-img',
	templateUrl: './button-img.component.html',
	styleUrl: './button-img.component.scss',
})
export class ButtonImgComponent {
	@Input() label!: string;
	@Input() backgroundUrl?: string;
	@Input() data!: any;
	@Input() disabled!: boolean;
	@Input() variant: 'base' | 'large' = 'base';

	@Output() onClickBtnImg: EventEmitter<any> = new EventEmitter();

	@ViewChild('pButton', { read: ElementRef }) pButtonElement!: ElementRef;

	constructor(private renderer: Renderer2) {}

	onClick() {
		this.onClickBtnImg.emit(this.data ?? null);
	}

	ngAfterViewInit(): void {
		if (this.pButtonElement) {
			const buttonNativeElement = this.pButtonElement.nativeElement;
			const firstChild: HTMLElement = buttonNativeElement.querySelector('.p-button') as HTMLElement;

			if (firstChild && this.backgroundUrl) {
				this.renderer.setStyle(firstChild, 'backgroundImage', `url('${this.backgroundUrl}')`);
			}
		}
	}
}
