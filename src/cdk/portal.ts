import { ApplicationRef, ComponentRef, inject, Injectable, Injector, ViewContainerRef } from '@angular/core';

import { ComponentType } from './types';

@Injectable({
	providedIn: 'root',
})
export class Portal {
	private appRef = inject(ApplicationRef);
	private vcr = inject(ViewContainerRef);
	private componentRefs: ComponentRef<unknown>[] = [];

	/**
	 * @param componentType -  component which we want to use as base for creating our dynamic component
	 * @param injector -  component injector
	 * @return ComponentRef
	 * @description I commented line which uses the appRef because she was called the built-in angular attaching bug-error
	 * @description ERROR Error: NG0902: This view is already attached to a ViewContainer!
	 * @description this sick will be affect the Angular Material library and i  has made a decision to be comment this line of code
	 *
	 **/
	public createPortal<T>(componentType: ComponentType<T>, injector: Injector): ComponentRef<unknown> {
		const componentRef = this.vcr.createComponent(componentType, { injector });
		this.componentRefs.push(componentRef);
		this.vcr.insert(componentRef.hostView);
		// this.appRef.attachView(componentRef.hostView);
		return componentRef;
	}

	/**
	 * @description this method remove portal from parent view
	 **/

	public destroyPortal(componentRef: ComponentRef<any>): void {
		const index = this.componentRefs.indexOf(componentRef);
		if (index !== -1) {
			this.componentRefs.splice(index, 1);
			this.appRef.detachView(componentRef.hostView);
			componentRef.destroy();
		}
	}
}
