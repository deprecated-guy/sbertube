import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent, FormErrorComponent, HintDirective, IconComponent, PlayerComponent, ToastRef } from '@ui';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CommentService, UserService, VideoLoader } from '@showcase/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BackendErrors, CommentInput, CommentResponse, User, Video } from '@types';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { ButtonComponent } from '@showcase/components/ui';
import { COMMENT_FORM } from '@di';
import { ReactiveFormsModule } from '@angular/forms';
import { Portal } from '@cdk';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { TimeAgoPipe } from '@showcase/components/video/pipes/time-ago.pipe';
import { PersistenceService } from '@shared/services';
import { CommentComponent } from '@showcase/components/video/comment/comment.component';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { getCurrentUserSelector } from '@store/selectors';

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
		UserAvatarComponent,
		TimeAgoPipe,
		IconComponent,
		HintDirective,
		CommentComponent,
		RouterLink,
	],
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	providers: [Portal, ToastRef],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
	private _videoLoader = inject(VideoLoader);
	private _toastRef = inject(ToastRef);
	private _route = inject(ActivatedRoute);
	private _titleService = inject(Title);
	private _userService = inject(UserService);
	private store = inject(Store);
	private _commentService = inject(CommentService);
	private _destroyRef = inject(DestroyRef);
	private _persistenceService = inject(PersistenceService);
	protected videoTitle$ = this._route.paramMap.pipe(map((param) => param.get('title') as string));
	protected video$ = this._videoLoader.getVideoByTitle(this.videoTitle$);
	protected video = signal({} as Video);
	protected currentUser$ = this.store.select(getCurrentUserSelector);
	protected user = signal({} as User);
	protected comments = signal(this.video().comments as CommentResponse[]);
	protected isOpenFull = false;
	protected form = inject(COMMENT_FORM);
	protected token = this._persistenceService.getItem('token');
	private router = inject(Router);

	protected get body() {
		return this.form.get('body');
	}

	protected openFull() {
		this.isOpenFull = !this.isOpenFull;
	}

	protected sendComment() {
		const data: CommentInput = {
			videoTitle: this.video().title,
			body: this.body?.value,
		};
		this._commentService
			.createComment(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (comment) => {
					this.comments.update((comments) => [...comments, comment]);
				},
				error: (err: BackendErrors) =>
					this._toastRef.createToast({ type: 'error', status: err.statusCode, text: 'error while commenting' }),
			});
	}

	ngOnInit() {
		this.video$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
			next: (v) => {
				this.comments.set(v.comments);
				this.video.set(v);
				this._titleService.setTitle(`${this.video().title}`);
			},
		});
		if (this.token) {
			this.currentUser$ = this._userService.getCurrentUser();
			this.currentUser$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
				next: (v) => this.user.set(v),
			});
		}
	}

	protected navigateToEditor() {
		const video = this.video();
		this.router.navigateByUrl('/video-editor', { state: { video: video } });
	}
}
