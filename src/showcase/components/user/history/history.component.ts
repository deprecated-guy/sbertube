import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { Title } from '@angular/platform-browser';
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
export class HistoryComponent implements OnInit {
	private _titleService = inject(Title);
	private _userService = inject(UserService);
	protected currentUser$ = this._userService.getCurrentUser();
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected user = toSignal(this.currentUser$, { initialValue: <User>{} });

	ngOnInit() {
		console.log(this.user());
		this._titleService.setTitle('Views history');
	}
}
