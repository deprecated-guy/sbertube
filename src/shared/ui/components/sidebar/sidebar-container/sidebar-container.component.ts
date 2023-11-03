import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, NgZone, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { MyHammerConfig } from '../../../../../app/app.config';

@Component({
	selector: 'sb-sidebar-container',
	standalone: true,
	imports: [CommonModule, SidebarComponent, HammerModule],
	providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
	templateUrl: './sidebar-container.component.html',
	styleUrls: ['./sidebar-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContainerComponent {
	@Input() template!: TemplateRef<unknown>;

	private elRef = inject(ElementRef<HTMLDivElement>);
	private ngZone = inject(NgZone);

	private get container() {
		return this.elRef.nativeElement.querySelector('.sidebar') as HTMLDivElement;
	}
	protected close() {
		this.container.classList.add('sidebar-out');
		this.ngZone.runOutsideAngular(() => setTimeout(() => this.elRef.nativeElement.remove(), 200));
	}
}
