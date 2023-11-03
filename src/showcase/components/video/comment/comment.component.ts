import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	Input,
	OnInit,
	signal,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent, HintDirective, IconComponent } from '@ui';
import { Comment, CommentEdit, CommentResponse, LikeRequest, User, Video } from '@types';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { TimeAgoPipe } from '@showcase/components/video/pipes/time-ago.pipe';
import { PersistenceService } from '@shared/services';

import { ButtonComponent, RippleDirective, showButtonsAnimation } from '@showcase/components/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommentService, DislikeService, LikeService } from '@showcase/services';
import { COMMENT_EDIT } from '@di';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'sb-comment',
	standalone: true,
	imports: [
		CommonModule,
		IconComponent,
		HintDirective,
		UserAvatarComponent,
		TimeAgoPipe,
		ButtonComponent,
		RippleDirective,
		ReactiveFormsModule,
		FormErrorComponent,
		RouterLink,
	],
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [showButtonsAnimation],
})
export class CommentComponent implements OnInit {
	@ViewChild('area', { read: ElementRef<HTMLTextAreaElement> })
	private _textArea!: ElementRef<HTMLTextAreaElement>;
	@Input() comment: CommentResponse = <CommentResponse>{};
	@Input() video: Video = <Video>{};
	protected form = inject(COMMENT_EDIT);
	private _persistenceService = inject(PersistenceService);
	private _commentService = inject(CommentService);
	protected token = this._persistenceService.getItem('token');
	protected isEditable = false;
	private _likeService = inject(LikeService);
	private _dislikeService = inject(DislikeService);
	private _destroyRef = inject(DestroyRef);
	@Input() user!: User;
	protected commentSig = signal({} as Comment);

	protected isLiked = false;
	private get element() {
		return this._textArea.nativeElement;
	}
	protected makeEditable() {
		this.isEditable = !this.isEditable;
		this.element.classList.toggle('editable');
	}

	protected likeComment(comment: Comment) {
		const data: LikeRequest = {
			commentId: comment.id,
		};

		console.log(data);
		this.isLiked = true;

		if (!comment.isLiked && comment.dislikesCount > 0) {
			this._likeService.addLikeToComment(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(console.log);
		}
		this.commentSig.update((video) => {
			return {
				...video,
				isLiked: true,
				isDisliked: false,
				likesCount: video.likesCount + 1,
				dislikesCount: video.dislikesCount > 0 ? (video.dislikesCount -= 1) : video.dislikesCount,
			};
		});
		console.log('signal value ', this.commentSig());
		return;
	}

	protected addDislike(comment: Comment) {
		const data: LikeRequest = {
			videoId: comment.id,
		};

		this.isLiked = false;

		if (comment.isDisliked) {
			return;
		}
		if (comment.likesCount > 0 && localStorage.getItem('commentLikeId') && !comment.isDisliked) {
			this._dislikeService.addDislikeToComment(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
		}
		this.commentSig.update((video) => {
			return {
				...video,
				isLiked: false,
				isDisliked: true,
				dislikesCount: (video.dislikesCount += 1),
				likesCount: video.likesCount > 0 ? (video.likesCount -= 1) : video.likesCount,
			};
		});
		return;
	}

	protected deleteComment(comment: Comment) {
		this._commentService.deleteComment(comment.id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
	}

	protected editComment(comment: Comment) {
		const data: CommentEdit = {
			body: this.form.controls['body'].value,
			id: comment.id,
			isEdited: true,
			editedAt: new Date().toISOString(),
		};

		this._commentService.editComment(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
	}

	ngOnInit() {
		console.log(this.comment.comment.author.user.token === this.token);
		console.log(this.comment);
		this.commentSig.set(this.comment.comment);
	}
}
