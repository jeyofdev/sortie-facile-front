import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-button-img',
	templateUrl: './button-img.component.html',
	styleUrl: './button-img.component.scss',
})
export class ButtonImgComponent {
	@Input() label!: string;
	@Input() backgroundUrl?: string;

	@Output() onClickBtnImg: EventEmitter<void> = new EventEmitter();

	@ViewChild('pButton', { read: ElementRef }) pButtonElement!: ElementRef;

	constructor(private renderer: Renderer2) {}

	onClick() {
		this.onClickBtnImg.emit();
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
