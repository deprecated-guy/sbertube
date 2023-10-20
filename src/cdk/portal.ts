import { ApplicationRef, ComponentRef, inject, Injectable, Injector, ViewContainerRef } from '@angular/core';

import { ComponentType } from './types';

@Injectable({
	providedIn: 'root',
})
export class Portal {
	private appRef = inject(ApplicationRef);
	private vcr = inject(ViewContainerRef);
	private componentRefs: ComponentRef<unknown>[] = [];

	public createPortal<T>(componentType: ComponentType<T>, injector: Injector): ComponentRef<unknown> {
		const componentRef = this.vcr.createComponent(componentType, { injector });
		this.componentRefs.push(componentRef);
		this.vcr.insert(componentRef.hostView);
		this.appRef.attachView(componentRef.hostView);
		return componentRef;
	}

	public destroyPortal(componentRef: ComponentRef<any>): void {
		const index = this.componentRefs.indexOf(componentRef);
		if (index !== -1) {
			this.componentRefs.splice(index, 1);
			this.appRef.detachView(componentRef.hostView);
			componentRef.destroy();
		}
	}
}
