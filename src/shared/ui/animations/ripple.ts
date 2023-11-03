import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, ElementRef, NgZone, Renderer2 } from '@angular/core';

export const createRipple = (
	renderer: Renderer2,
	destroyRef: DestroyRef,
	rippleColor: string,
	elementRef: ElementRef<HTMLButtonElement>,
	ngZone: NgZone,
) => {
	console.log(renderer);
	return fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown')
		.pipe(takeUntilDestroyed(destroyRef))
		.subscribe({
			next: (e) => {
				const ripple = renderer.createElement('div');
				renderer.addClass(ripple, 'ripple');
				ripple.style.position = 'absolute';
				ripple.style.left = e.offsetX + 'px';
				ripple.style.background = rippleColor;
				ripple.style.opacity = 0.3;
				ripple.style.top = e.offsetY + 'px';
				renderer.appendChild(elementRef.nativeElement, ripple);
				console.log(ripple);
				ngZone.runOutsideAngular(() => setTimeout(() => renderer.removeChild(elementRef.nativeElement, ripple), 400));
			},
		});
};
