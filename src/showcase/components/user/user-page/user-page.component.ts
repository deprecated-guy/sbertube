import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { UserPageSwitcheComponent } from '@showcase/components/ui';
import { ControlComponent, IconComponent } from '@ui';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { USER_EDIT_FORM } from '@di';

@Component({
	selector: 'sb-user-page',
	standalone: true,
	imports: [
		CommonModule,
		UserBannerComponent,
		UserAvatarComponent,
		UserPageSwitcheComponent,
		IconComponent,
		ControlComponent,
	],
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('open', [
			state('open', style({ width: '*' })),
			state('closed', style({ width: 50 })),
			transition('open<=> closed', animate(300)),
		]),
	],
})
export class UserPageComponent {
	protected settingsState = 'closed';
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = inject(USER_EDIT_FORM);

	protected get allWatchedTime() {
		return this.currentUser().watchedVideos.reduce((index, video) => (index += video.video.watchedTime), 0);
	}

	protected get username() {
		return this.form.get('username');
	}

	protected get password() {
		return this.form.get('password');
	}

	protected get avatarBg() {
		return this.form.get('avatarBackground');
	}

	protected get bannerBg() {
		return this.form.get('bannerBackground');
	}

	protected changeSettingsState() {
		this.settingsState = this.settingsState == 'closed' ? 'open' : 'closed';
	}
}
