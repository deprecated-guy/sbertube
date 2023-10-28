import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors, User } from '@shared/types';
import { colorParser, UserService } from '@showcase/services';
import { ButtonComponent } from '@showcase/components/ui';
import { RouterLink } from '@angular/router';
import { PersistenceService } from '@shared/services';
import { Portal } from '@cdk';
import { ControlFileComponent, DialogRef, ToastRef, WindowComponent } from '@ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const makeColorString = (v: string) => {
	const color = colorParser(v);
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
const convertToPx = (v: number) => `${v}px`;
@Component({
	selector: 'sb-user-banner',
	standalone: true,
	imports: [CommonModule, ButtonComponent, RouterLink, ControlFileComponent],
	templateUrl: './user-banner.component.html',
	styleUrls: ['./user-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef, DialogRef],
})
export class UserBannerComponent {
	@Input() user: User = {} as User;

	@Input({ transform: (v: number) => convertToPx(v) }) fontSize = 21;
	@Input({ transform: (v: string) => makeColorString(v) }) color = '';
	@Input() rippleColor = '';
	@Input() hoverBgColor = '';
	@Input() btnBgColor = '';

	private _file: File = {} as File;
	private _persistenceService = inject(PersistenceService);
	private _dialogRef = inject(DialogRef);
	private _toastRef = inject(ToastRef);
	private _userService = inject(UserService);
	private _destroyRef = inject(DestroyRef);
	protected token = this._persistenceService.getItem('token');
	protected imageName = '';

	/**
	 * @param templateRef is a reference to template which will bw shows in your window
	 * **/
	protected openWindow(templateRef: TemplateRef<unknown>) {
		this._dialogRef
			.open(
				WindowComponent,
				{ class: 'sm', template: templateRef, isBackdrop: true },
				{ windowName: 'Update Banner Window' },
			)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe();
	}

	protected uploadImage() {
		const data = new FormData();
		data.set('file', this._file);
		this._userService
			.editBannerImage(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (user) => {
					this.imageName = user.bannerBackgroundImage;
					this._toastRef.createToast({ type: 'success', text: 'Updated Successfully', status: 200 });
				},
				error: (err: BackendErrors) => {
					this._toastRef.createToast({ type: 'error', text: 'Updated Successfully', status: err.statusCode });
				},
			});
		console.log(data);
	}

	protected getFile(event: File) {
		this._file = event;
	}
}
