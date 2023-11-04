import {
	ChangeDetectorRef,
	DestroyRef,
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	inject,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Video } from '@types';
import { VideoLoader } from '@showcase/services';
import { EditVideo } from '@shared/types/video/edit-video.interface';
import { PersistenceService } from '@shared/services';

@Directive({
	selector: '[sbGetPlayer]',
	standalone: true,
})
export class GetPlayerDirective implements OnInit {
	private _elRef = inject(ElementRef<HTMLVideoElement>);
	private _currentTime = this._elRef.nativeElement.currentTime;
	private _duration = this._elRef.nativeElement.duration;
	private _cdr = inject(ChangeDetectorRef);
	private _destroyRef = inject(DestroyRef);
	private _videoLoader = inject(VideoLoader);
	private _persistenceService = inject(PersistenceService);
	private _token = this._persistenceService.getItem('token');
	@Input() video = <Video>{};

	@Output() currentTime = new EventEmitter<number>();
	@Output() duration = new EventEmitter<number>();

	protected get element() {
		return this._elRef.nativeElement;
	}

	private load() {
		this.element.load();
		this._duration = this.element.duration;
	}

	protected play() {
		this._currentTime = this.element.currentTime;
		this._duration = this.element.duration;

		this.element.muted = true;
		this._cdr.detectChanges();
		console.log(this._currentTime);
		return from(this.element.play());
	}

	protected stop() {
		this.element.pause();

		this.element.muted = true;
		this._cdr.detectChanges();
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		this.play().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({});
		this.duration.emit(this._duration);
		this.currentTime.emit(this._currentTime);
		this.element.addEventListener('timeupdate', this.updateCurrentTime.bind(this));
	}

	private updateCurrentTime() {
		if (!this._token) return;
		this._currentTime = this.element.currentTime;
		this._cdr.detectChanges();
		this.currentTime.emit(this._currentTime);
		const data: EditVideo = {
			...this.video,
			isViewed: true,
			watchedTime: this._currentTime,
			timeToWatch: this._duration - this._currentTime,
			watchDate: new Date().toISOString(),
		};

		console.log(this.element.currentTime);
		this._videoLoader.updateVideo(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.stop();
	}

	ngOnInit() {
		this.load();
	}
}
