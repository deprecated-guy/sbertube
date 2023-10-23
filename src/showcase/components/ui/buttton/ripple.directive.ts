import { Directive, ElementRef, HostListener, inject, Input, NgZone, Renderer2 } from '@angular/core';

@Directive({
	selector: 'button[sbRipple]',
	standalone: true,
})
export class RippleDirective {
	private _elRef = inject(ElementRef<HTMLButtonElement>);
	private _ngZone = inject(NgZone);
	private _renderer = inject(Renderer2);

	@Input() rippleColor = 'white';

	@HostListener('mousedown', ['$event'])
	onMousedown(e: MouseEvent) {
		const ripple = this._renderer.createElement('div');
		this._renderer.addClass(ripple, 'ripple');
		ripple.style.position = 'absolute';
		ripple.style.left = e.clientX - this._elRef.nativeElement.offsetLeft + 'px';
		ripple.style.background = this.rippleColor;
		ripple.style.top = e.clientY - this._elRef.nativeElement.offsetTop + 'px';
		this._renderer.appendChild(this._elRef.nativeElement, ripple);
		this._ngZone.runOutsideAngular(() =>
			setTimeout(() => this._renderer.removeChild(this._elRef.nativeElement, ripple), 500),
		);
	}
}
