import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
export class PlayerComponent {
	protected _api = inject(VgAPI);

	p;

	@Input({ required: true }) size: 'sm' | 'lg' | 'full' | 'md' | 'mobile' | 'history' = 'lg';
	@Input() source = '';
	@Output() duration = new EventEmitter<number>();
	@Input() showTime = true;

	public onPlayerReady(api: VgAPI) {
		this._api = api;
	}

	getDuration(event: number) {
		this.duration.emit(event);
	}
}
