import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent, FormErrorComponent, IconComponent } from '@ui';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@showcase/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';
import { IS_MOBILE, USER_EDIT_FORM } from '@di';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { getCurrentUserStart } from '@store/actions';
import { getCurrentUserSelector } from '@store/selectors';

@Component({
	selector: 'sb-settings',
	standalone: true,
	imports: [CommonModule, ControlComponent, FormErrorComponent, IconComponent, ReactiveFormsModule],
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('openDown', [
			state('open', style({ width: '100%', height: '*' })),
			state('closed', style({ width: '100%', height: 0 })),
			transition('open<=> closed', animate(300)),
		]),
	],
})
export class SettingsComponent implements OnInit {
	protected editorAnimationState = 'closed';
	protected settingsAnimationState = 'closed';
	private store = inject(Store);
	private _userService = inject(UserService);
	protected currentUser$ = this.store.select(getCurrentUserSelector);
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected IS_MOBILE$ = inject(IS_MOBILE);

	protected form = inject(USER_EDIT_FORM);

	protected get allWatchedTime() {
		return this.currentUser().watchedVideos.reduce((index, video) => (index += video.video.watchedTime), 0);
	}

	protected get email() {
		return this.form.get('email');
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
	protected changeSettingsAnimationState() {
		this.settingsAnimationState = this.settingsAnimationState == 'closed' ? 'open' : 'closed';
	}
	protected changeEditorAnimationState() {
		this.editorAnimationState = this.editorAnimationState == 'closed' ? 'open' : 'closed';
	}

	ngOnInit() {
		this.store.dispatch(getCurrentUserStart());
		console.log(this.currentUser());
	}
}
