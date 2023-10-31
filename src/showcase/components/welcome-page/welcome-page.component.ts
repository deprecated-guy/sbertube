import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, RippleDirective, VideoPreviewComponent } from '@showcase/components/ui';
import { UserService, VideoLoader } from '@showcase/services';
import { IS_MOBILE, SEARCH_FORM } from '@di';
import { IconComponent, PlayerComponent } from '@ui';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { RouterLink } from '@angular/router';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { PersistenceService } from '@shared/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';

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
	animations: [],
})
export class WelcomePageComponent {
	private _videoLoader = inject(VideoLoader);

	protected search = inject(SEARCH_FORM);
	private _persistenceService = inject(PersistenceService);
	private token = this._persistenceService.getItem('token');
	protected videos$ = this._videoLoader.getVideos(this.search.get('search')?.value as string);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected user = toSignal(this.currentUser$, { initialValue: <User>{} });
}
