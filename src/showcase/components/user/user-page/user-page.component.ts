import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { UserPageSwitcheComponent } from '@showcase/components/ui';

@Component({
	selector: 'sb-user-page',
	standalone: true,
	imports: [CommonModule, UserBannerComponent, UserAvatarComponent, UserPageSwitcheComponent],
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
}
