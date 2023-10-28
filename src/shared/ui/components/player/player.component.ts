import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	VgAPI,
	VgBufferingModule,
	VgControlsModule,
	VgCoreModule,
	VgImaAdsModule,
	VgOverlayPlayModule,
} from 'ngx-videogular';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { VgModuloModule } from '@videogular/ngx-videogular/modulo';
import { Subscription } from 'rxjs';
import { VideoDirective } from '@shared/ui/directives';

@Component({
	selector: 'sb-player',
	standalone: true,
	imports: [
		CommonModule,
		VgControlsModule,
		VgCoreModule,
		VgBufferingModule,
		VgOverlayPlayModule,
		VgStreamingModule,
		VgModuloModule,
		VgImaAdsModule,
		VideoDirective,
	],
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnDestroy {
	@ViewChild('myMedia', { static: true, read: ElementRef<HTMLVideoElement> })
	private _media!: ElementRef<HTMLVideoElement>;
	protected api = inject(VgAPI);
	private aoiSub$!: Subscription;

	@Input({ required: true }) size: 'sm' | 'lg' | 'full' | 'md' = 'lg';
	@Input() source = '';
	@Output() duration = new EventEmitter<number>();
	formatedDuration = 0;

	public onPlayerReady(api: VgAPI) {
		this.api = api;
		this.aoiSub$ = this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
	}

	public playVideo() {
		this.api.play();
	}
	ngOnDestroy() {
		this.aoiSub$.unsubscribe();
	}

	getDuration(event: number) {
		this.duration.emit(event);
		this.formatedDuration = event;
	}
}
