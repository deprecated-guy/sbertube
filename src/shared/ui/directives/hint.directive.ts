import { ComponentRef, Directive, HostListener, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { HintComponent } from '@ui';

@Directive({
	selector: '[sbHint]',
	standalone: true,
})
export class HintDirective {
	@Input() templateRef!: TemplateRef<unknown>;
	private vcr = inject(ViewContainerRef);
	private componentRef: ComponentRef<any> | null = null;

	@HostListener('mouseenter', ['$event'])
	onClick(e: MouseEvent) {
		if (!this.componentRef) {
			this.componentRef = this.vcr.createComponent(HintComponent);

			const instance = this.componentRef.instance;

			instance.templateRef = this.templateRef;
			instance.left = e.pageX;
			instance.top = e.pageY - 50;
			this.componentRef.changeDetectorRef.detectChanges();
		}

		return;
	}

	@HostListener('document:click')
	onMouseLeave() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.vcr.clear();
			this.componentRef = null;
		}
	}
}
