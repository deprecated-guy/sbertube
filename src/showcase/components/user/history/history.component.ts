import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { PlayerComponent } from '@ui';
import { RouterLink } from '@angular/router';
import { ButtonComponent, VideoPreviewComponent } from '@showcase/components/ui';
import { DayCheckPipe } from '@shared/pipes';
import { IS_MOBILE } from '@di';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@types';
@Component({
	selector: 'sb-history',
	standalone: true,
	imports: [
		CommonModule,
		PlayerComponent,
		RouterLink,
		VideoPreviewComponent,
		DayCheckPipe,
		ButtonComponent,
		VideoActionComponent,
	],
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected user = toSignal(this.currentUser$, { initialValue: <User>{} });
}
