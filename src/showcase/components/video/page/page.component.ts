import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent, FormErrorComponent, PlayerComponent } from '@ui';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UserService, VideoLoader } from '@showcase/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { User, Video } from '@types';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { ButtonComponent } from '@showcase/components/ui';
import { COMMENT_FORM } from '@di';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'sb-page',
	standalone: true,
	imports: [
		CommonModule,
		PlayerComponent,
		VideoActionComponent,
		ButtonComponent,
		ControlComponent,
		FormErrorComponent,
		ReactiveFormsModule,
	],
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
	private _videoLoader = inject(VideoLoader);
	private _route = inject(ActivatedRoute);
	private _userService = inject(UserService);
	protected videoTitle$ = this._route.paramMap.pipe(map((param) => param.get('title') as string));
	protected video$ = this._videoLoader.getVideoByTitle(this.videoTitle$);
	protected video = toSignal(this.video$, { initialValue: {} as Video });
	protected currentUser$ = this._userService.getCurrentUser();
	protected user = toSignal(this.currentUser$, { initialValue: <User>{} });
	protected isOpenFull = false;
	protected form = inject(COMMENT_FORM);

	protected get body() {
		return this.form.get('body');
	}

	protected openFull() {
		this.isOpenFull = !this.isOpenFull;
	}

	ngOnInit() {
		console.log(this.video());
	}
}
