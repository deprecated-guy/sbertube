import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPlayerDirective } from '@showcase/components/ui/video-preview/getvideo.directive';
import { FormsModule } from '@angular/forms';
import { Video } from '@types';
import { IS_MOBILE } from '@di';

@Component({
	selector: 'sb-video-preview',
	standalone: true,
	imports: [CommonModule, GetPlayerDirective, FormsModule],
	templateUrl: './video-preview.component.html',
	styleUrls: ['./video-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPreviewComponent {
	@Input() source = '';
	@Input() class: 'sm' | 'full' = 'sm';
	@Input({ required: true }) video: Video = <Video>{};
	private _cdr = inject(ChangeDetectorRef);
	protected isHoveredOn = false;
	protected currentTime!: number;
	protected duration!: number;
	protected IS_MOBILE$ = inject(IS_MOBILE);

	@HostListener('mouseenter')
	onMouseEnter() {
		this.isHoveredOn = true;
	}
	@HostListener('mouseleave')
	onMouseLeave() {
		this.isHoveredOn = false;
	}

	protected getDuration(event: number) {
		this.duration = event;
	}
	protected getCurrentTime(event: number) {
		this.currentTime = event;
	}

	protected onChange(event: Event) {
		this._cdr.detectChanges();
		const target = <HTMLInputElement>event.target;
		target.value = this.currentTime.toString();
		this.currentTime = +target.value;
	}
}
