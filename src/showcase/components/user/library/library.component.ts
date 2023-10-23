import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, UserPageSwitcheComponent } from '@showcase/components/ui';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { UserService } from '@showcase/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';

@Component({
	selector: 'sb-library',
	standalone: true,
	imports: [CommonModule, UserBannerComponent, UserAvatarComponent, UserPageSwitcheComponent, ButtonComponent],
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent {
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
}
