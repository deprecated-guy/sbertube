import { ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { Portal } from '@cdk';
import { SnackbarComponent } from './snackbar';
import { SnackbarOptions } from '@shared//ui';

@Injectable({
	providedIn: 'root',
})
export class SnackbarRef {
	private _portal = inject(Portal);
	private _component!: ComponentRef<SnackbarOptions>;

	public showSnackbar(options: SnackbarOptions) {
		console.log(this._component);
		const injector = Injector.create([]);

		const componentRef = this._portal.createPortal(SnackbarComponent, injector) as ComponentRef<SnackbarOptions>;
		componentRef.instance.template = options.template;
		componentRef.instance.message = options.message;
		componentRef.changeDetectorRef.detectChanges();
		this._component = componentRef;
	}

	public hideSnackbar() {
		if (!this._component) return;
		this._portal.destroyPortal(this._component);
		this._component.destroy();
	}
}
