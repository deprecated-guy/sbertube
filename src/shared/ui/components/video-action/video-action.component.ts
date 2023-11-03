import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DislikeService, LikeService } from '@showcase/services';
import { LikeRequest, User, Video } from '@types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '@ui';
import { RippleDirective } from '@showcase/components/ui';

@Component({
	selector: 'sb-video-action',
	standalone: true,
	imports: [CommonModule, RippleDirective, IconComponent],
	templateUrl: './video-action.component.html',
	styleUrls: ['./video-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoActionComponent implements OnInit {
	private _likeService = inject(LikeService);
	private _dislikeService = inject(DislikeService);
	private _destroyRef = inject(DestroyRef);
	@Input() video!: Video;
	@Input() user!: User;
	protected videoSig = signal({} as Video);
	protected userSig = signal({} as User);
	@Input({ required: true }) actionType: 'like' | 'dislike' = 'like';
	@Input() isDisabled = false;

	protected isLiked = false;

	protected addLike(video: Video) {
		const data: LikeRequest = {
			videoId: video.id,
		};
		this.isLiked = true;

		if (this.video.isLiked) {
			return;
		}
		if (video.dislikesCount > 0 && localStorage.getItem('videoDislikeId')) {
		}

		this._likeService
			.addLikeToVideo(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => {});
		this.videoSig.update((video) => {
			return {
				...video,
				isLiked: true,
				isDisliked: false,
				likesCount: video.likesCount + 1,
				dislikesCount: video.dislikesCount > 0 ? (video.dislikesCount -= 1) : video.dislikesCount,
			};
		});
		console.log('signal value ', this.videoSig());
		console.log(this.video);
	}

	protected addDislike(video: Video) {
		const data: LikeRequest = {
			videoId: video.id,
		};
		console.log(data);
		this.isLiked = false;

		if (this.video.isDisliked) {
			return;
		}
		if (video.likesCount > 0 && localStorage.getItem('videoLikeId')) {
		}
		this._dislikeService.addDislikeToVideo(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
		this.videoSig.update((video) => {
			return {
				...video,
				isLiked: false,
				isDisliked: true,
				dislikesCount: (video.dislikesCount += 1),
				likesCount: video.likesCount > 0 ? (video.likesCount -= 1) : video.likesCount,
			};
		});
		console.log(this.video);
	}

	ngOnInit() {
		this.videoSig.set(this.video);
		this.userSig.set(this.user);
	}
}
