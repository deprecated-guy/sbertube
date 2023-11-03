import { ChangeDetectionStrategy, Component, DestroyRef, inject, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ControlComponent, FormErrorComponent, ServerErrorsComponent, ToastRef } from '@ui';
import { ButtonComponent } from '@showcase/components/ui';
import { Video_EDIT } from '@di';
import { VideoLoader } from '@showcase/services';
import { EditVideo } from '@shared/types/video/edit-video.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Portal } from '@cdk';
import { BackendErrors } from '@types';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
	selector: 'sb-video-edit',
	standalone: true,
	imports: [
		CommonModule,
		ControlComponent,
		ButtonComponent,
		ReactiveFormsModule,
		FormErrorComponent,
		ServerErrorsComponent,
	],
	templateUrl: './video-edit.component.html',
	styleUrls: ['./video-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef],
})
export class VideoEditComponent implements OnInit {
	protected serverErrors$ = new Subject<BackendErrors>();
	private _router = inject(Router);
	private _videoLoader = inject(VideoLoader);
	protected state$ = this._router.getCurrentNavigation()?.extras.state;
	private _toastRef = inject(ToastRef);
	protected form = inject(Video_EDIT);
	protected isLoading = false;
	private _ngZone = inject(NgZone);
	private _destroyRef = inject(DestroyRef);
	private _timer!: any;

	protected submitForm() {
		const data: EditVideo = {
			id: +this.state$?.['video'].id,
			title: this.form.controls['title'].value as string,
			body: this.form.controls['body'].value as string,
			timeToWatch: +this.state$?.['video'].timeToWatch,
			watchedTime: +this.state$?.['video'].watchedTime,
			isViewed: !!this.state$?.['video'].isViewed,
			watchDate: this.state$?.['video'].watchedTime,
		};
		console.log(data);
		this.isLoading = true;
		setTimeout(() => {}, 2000);
		this._ngZone.runOutsideAngular(() =>
			setTimeout(() => {
				this._videoLoader
					.updateVideo(data)
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: () => this._toastRef.createToast({ type: 'success', text: 'All Done', status: 200 }),
						error: (err: BackendErrors) => {
							this._toastRef.createToast({ type: 'error', status: err.statusCode, text: 'Error while updating' });
							this.serverErrors$.next(err);
						},
					});
				this.isLoading = false;
			}, 2000),
		);
		this._timer = setTimeout(() => this._router.navigateByUrl(`/video/${this.state$?.['video'].alias}`), 2500);
	}
	ngOnInit() {
		if (!this.state$?.['video']) {
			this._router.navigateByUrl('/**');
		}
		clearTimeout(this._timer);
	}
}
