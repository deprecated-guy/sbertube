import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, NgZone, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENT_DATA } from '../../sidebar/token/COMPONENT_DATA';
import { ComponentInitialData } from '../../sidebar/types';
const transformToPx = (v: number) => v + 'px';
@Component({
	selector: 'sb-window',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './window.component.html',
	styleUrls: ['./window.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
	private elRef = inject(ElementRef);
	protected state = 'closed';
	private ngZone = inject(NgZone);
	public data = inject<ComponentInitialData>(COMPONENT_DATA);
	private get container() {
		return this.elRef.nativeElement.querySelector('.dialog') as HTMLDivElement;
	}
	@Input({ transform: (v: number) => transformToPx(v) }) width = 200;
	@Input({ transform: (v: number) => transformToPx(v) }) height = 200;
	@Input() template!: TemplateRef<unknown>;
	@Input() isBackdrop = true;
	@Input() class: 'sm' | 'lg' | 'full' = 'sm';

	close() {
		this.container.classList.add('slide-to-top');
		this.container.addEventListener('animationend', () => {
			this.ngZone.runOutsideAngular(() => setTimeout(() => this.elRef.nativeElement.remove(), 0));
		});
	}
}
