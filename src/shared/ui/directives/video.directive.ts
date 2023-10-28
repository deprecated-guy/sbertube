import { AfterViewInit, Directive, ElementRef, EventEmitter, inject, Output } from '@angular/core';

@Directive({
	selector: '[sbVideo]',
	standalone: true,
})
export class VideoDirective implements AfterViewInit {
	private elRef = inject(ElementRef<HTMLVideoElement>);
	@Output() public duration = new EventEmitter<number>();

	ngAfterViewInit() {
		const videoElement: HTMLVideoElement = this.elRef.nativeElement;
		videoElement.addEventListener('loadedmetadata', () => {
			if (!isNaN(videoElement.duration)) {
				this.duration.emit(videoElement.duration);
				console.log(videoElement.duration);
			}
		});
	}
}
