import { Directive, ElementRef, HostListener, inject, Input, NgZone, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[sbRipple]',
	standalone: true,
})
export class RippleDirective implements OnInit {
	private _elRef = inject(ElementRef<HTMLButtonElement>);
	private _ngZone = inject(NgZone);
	private _renderer = inject(Renderer2);

	@Input() rippleColor = 'white';

	@HostListener('mousedown', ['$event'])
	onMousedown(e: MouseEvent) {
		const ripple = this._renderer.createElement('div');
		this._renderer.addClass(ripple, 'ripple');
		ripple.style.left = e.offsetX + 'px';
		ripple.style.background = this.rippleColor;
		ripple.style.top = e.offsetY + 'px';
		this._renderer.appendChild(this._elRef.nativeElement, ripple);
		this._ngZone.runOutsideAngular(() =>
			setTimeout(() => this._renderer.removeChild(this._elRef.nativeElement, ripple), 500),
		);
	}

	ngOnInit() {
		console.log('on init');
	}
}
