import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, NgZone, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-snackbar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
	private _elementRef = inject(ElementRef<HTMLDivElement>);
	private _ngZone = inject(NgZone);
	@Input() protected template: TemplateRef<unknown> = {} as TemplateRef<unknown>;
	@Input() protected message = '';

	private get element() {
		return this._elementRef.nativeElement;
	}

	protected close() {
		const element = this.element.querySelector('.snack') as HTMLDivElement;
		element.classList.add('removing');
		this._ngZone.runOutsideAngular(() => setTimeout(() => this.element.remove(), 300));
	}
}
