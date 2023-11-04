import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	Input,
	NgZone,
	Renderer2,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
	ControlComponent,
	ControlFileComponent,
	createRipple,
	DialogRef,
	FormErrorComponent,
	IconComponent,
	PlayerComponent,
	ToastRef,
	WindowComponent,
} from '@ui';
import { IS_MOBILE, VIDEO_UPLOAD_FORM } from '@di';
import { VideoLoader } from '@showcase/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BackendErrors, User } from '@types';
import { types } from '@shared/types/vide-file-types';
import { ReactiveFormsModule } from '@angular/forms';
import { PersistenceService } from '@shared/services';

@Component({
	selector: 'sb-user-page-switche',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		IconComponent,
		ControlComponent,
		FormErrorComponent,
		ReactiveFormsModule,
		PlayerComponent,
		ControlFileComponent,
	],
	templateUrl: './user-page-switche.component.html',
	styleUrls: ['./user-page-switche.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageSwitcheComponent {
	@ViewChild('button', { read: ElementRef<HTMLButtonElement> })
	private _button!: ElementRef<HTMLButtonElement>;
	private _renderer = inject(Renderer2);
	private _ngZone = inject(NgZone);
	private _videoLoader = inject(VideoLoader);
	private _persistenceService = inject(PersistenceService);
	private _dialogRef = inject(DialogRef);
	private _cdr = inject(ChangeDetectorRef);
	private _destroyRef = inject(DestroyRef);
	private _toastRef = inject(ToastRef);
	protected token = this._persistenceService.getItem('token');
	protected file!: File;
	protected sourceLink!: string;
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected form = inject(VIDEO_UPLOAD_FORM);
	@Input({ required: true }) homePath = '';
	@Input({ required: true }) libraryPath = '';
	@Input({ required: true }) user!: User;

	protected openMobileWindow(templateRef: TemplateRef<unknown>) {
		this._dialogRef
			.open(
				WindowComponent,
				{ class: 'mobile', template: templateRef, isBackdrop: true },
				{ windowName: 'Upload video' },
			)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe();
	}

	protected get title() {
		return this.form.get('title');
	}

	protected get shortDescription() {
		return this.form.get('shortBody');
	}

	protected get description() {
		return this.form.get('body');
	}

	protected uploadVideo(rippleColor: string) {
		const data = new FormData();
		data.set('file', this.file);
		data.set('title', this.title?.value);
		data.set('shortBody', this.shortDescription?.value);
		data.set('body', this.description?.value);

		createRipple(this._renderer, this._destroyRef, rippleColor, this._button, this._ngZone);

		this._ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				this._videoLoader
					.sendVideo(data)
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: () => {
							this._toastRef.createToast({ type: 'success', text: 'Updated Successfully', status: 200 });
						},
						error: (err: BackendErrors) => {
							this._toastRef.createToast({ type: 'error', text: 'Error During Update', status: err.statusCode });
						},
					});
			}, 1000);
		});

		console.log(data);
	}

	protected getFile(event: File) {
		const reader = new FileReader();
		reader.readAsArrayBuffer(event);
		reader.onload = () => {
			this.sourceLink = URL.createObjectURL(event);
			this._cdr.detectChanges();
			console.log(this.sourceLink);
		};

		console.log(types[event.type]);
		if (!types[event.type]) {
			this._toastRef.createToast({ text: 'supported only videos', status: 500, type: 'error' });
			return;
		} else {
			this.file = event;
		}
	}
}
