import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, RippleDirective, VideoPreviewComponent } from '@showcase/components/ui';
import { VideoLoader } from '@showcase/services';
import { IS_MOBILE, SEARCH_FORM } from '@di';
import { IconComponent, PlayerComponent } from '@ui';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { RouterLink } from '@angular/router';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { PersistenceService } from '@shared/services';
import { User } from '@types';
import { Store } from '@ngrx/store';
import { getCurrentUserSelector } from '@store/selectors';
import { getCurrentUserStart } from '@store/actions';

@Component({
	selector: 'sb-welcome-page',
	standalone: true,
	imports: [
		RouterLink,
		CommonModule,
		ButtonComponent,
		IconComponent,
		PlayerComponent,
		UserAvatarComponent,
		RippleDirective,
		VideoPreviewComponent,
		VideoActionComponent,
	],
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
	private _videoLoader = inject(VideoLoader);

	protected search = inject(SEARCH_FORM);
	private _persistenceService = inject(PersistenceService);
	private store = inject(Store);
	private token = this._persistenceService.getItem('token');
	protected videos$ = this._videoLoader.getVideos(this.search.get('search')?.value as string);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected currentUser$ = this.store.select(getCurrentUserSelector);
	protected user = signal({} as User);

	ngOnInit() {
		if (this.token) {
			this.store.dispatch(getCurrentUserStart());
		}
	}
}
