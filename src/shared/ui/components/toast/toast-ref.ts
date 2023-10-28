import { ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { Portal } from '@cdk';

import { COMPONENT_DATA, ToastComponent, ToastSettings } from '@ui';

@Injectable({
	providedIn: 'root',
})
export class ToastRef {
	private portal = inject(Portal);
	private toast!: ComponentRef<ToastSettings>;
	public createToast(settings: ToastSettings) {
		const injector = Injector.create([{ provide: COMPONENT_DATA, useValue: '123' }]);
		const componentRef = this.portal.createPortal(ToastComponent, injector) as ComponentRef<ToastSettings>;
		const instance = componentRef.instance;
		instance.type = settings.type;
		instance.text = settings.text;
		instance.status = settings.status;
		this.toast = componentRef;
		componentRef.changeDetectorRef.detectChanges();
	}

	public removeToast() {
		this.portal.destroyPortal(this.toast);
	}
}
