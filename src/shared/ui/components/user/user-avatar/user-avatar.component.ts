import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	HostListener,
	inject,
	Input,
	NgZone,
	Renderer2,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors, User } from '@shared/types';
import {
	ControlFileComponent,
	DialogRef,
	IconComponent,
	SkeletonLoaderComponent,
	ToastRef,
	WindowComponent,
} from '@shared/ui';
import { IS_MOBILE } from '@di';
import { colorParser, UserService } from '@showcase/services';
import { PersistenceService } from '@shared/services';
import { Portal } from '@cdk';
import { ButtonComponent, RippleDirective } from '@showcase/components/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
const makeAsPx = (v: number) => v + 'px';
const makeColorString = (v: string) => {
	const color = colorParser(v);
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
@Component({
	selector: 'sb-user-avatar',
	standalone: true,
	imports: [
		CommonModule,
		SkeletonLoaderComponent,
		IconComponent,
		ButtonComponent,
		ControlFileComponent,
		RippleDirective,
	],
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, DialogRef, ToastRef],
})
export class UserAvatarComponent {
	@ViewChild('imgContainer', { read: ElementRef<HTMLDivElement> })
	private _imgContainer!: ElementRef<HTMLDivElement>;
	@ViewChild('button', { read: ElementRef<HTMLButtonElement> })
	private _button!: ElementRef<HTMLButtonElement>;

	@Input({ required: true }) user!: User;
	@Input({ required: true, transform: (v: number) => makeAsPx(v) }) width = 20;
	@Input({ transform: (v: number) => makeAsPx(v) }) height = 20;
	@Input({ transform: (v: string) => makeColorString(v) }) color!: string;
	@Input({ transform: (v: number) => makeAsPx(v) }) fontSize = 16;
	private _dialogRef = inject(DialogRef);
	private _toastRef = inject(ToastRef);
	private _userService = inject(UserService);

	private _destroyRef = inject(DestroyRef);
	private _persistenceService = inject(PersistenceService);
	private _file: File = <File>{};
	private _renderer = inject(Renderer2);
	private _ngZone = inject(NgZone);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected token = this._persistenceService.getItem('token');

	@HostListener('mouseenter')
	onMouseEnter() {
		if (this.user.token !== this._persistenceService.getItem('token')) return;
		const width = +this.width.toString().replace('px', '');
		const height = +this.width.toString().replace('px', '');
		if (width < 100 && height < 100) return;
		this._imgContainer.nativeElement.classList.remove('hidden');
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this._imgContainer.nativeElement.classList.add('hidden');
	}

	get firstUsernameLetter() {
		return this.user?.username?.slice(0, 1).toUpperCase();
	}

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

	protected uploadImage(rippleColor: string) {
		const data = new FormData();
		data.set('file', this._file);

		fromEvent<MouseEvent>(this._button.nativeElement, 'mousedown')
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (e) => {
					const ripple = this._renderer.createElement('div');
					this._renderer.addClass(ripple, 'ripple');
					ripple.style.position = 'absolute';
					ripple.style.left = e.offsetX + 'px';
					ripple.style.background = rippleColor;
					ripple.style.top = e.offsetY + 'px';
					this._renderer.appendChild(this._button.nativeElement, ripple);

					this._ngZone.runOutsideAngular(() =>
						setTimeout(() => this._renderer.removeChild(this._button.nativeElement, ripple), 400),
					);
				},
			});
		this._ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				this._userService
					.editAvatarImage(data)
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: (user) => {
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
		this._file = event;
	}
}
