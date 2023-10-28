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
			instance.left = e.clientX - 20;
			instance.top = e.clientY - 20;
			this.componentRef.changeDetectorRef.detectChanges();
		}
		console.log(this.componentRef);
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
