import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnDestroy,
	Output,
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
	protected _api = inject(VgAPI);
	private _apiSub$!: Subscription;
	private _elRef = inject(ElementRef);

	@Input({ required: true }) size: 'sm' | 'lg' | 'full' | 'md' | 'mobile' | 'history' = 'lg';
	@Input() source = '';
	@Output() duration = new EventEmitter<number>();
	@Input() showTime = true;
	formatedDuration = 0;

	public onPlayerReady(api: VgAPI) {
		this._api = api;
	}

	public playVideo() {
		this._api.play();
	}
	ngOnDestroy() {
		this._apiSub$.unsubscribe();
	}

	getDuration(event: number) {
		this.duration.emit(event);
		this.formatedDuration = event;
	}
}
