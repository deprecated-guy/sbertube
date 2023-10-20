import { ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { Portal } from '@cdk';
import { SnackbarComponent } from './snackbar';
import { SnackbarOptions } from '@components/ui';

@Injectable({
	providedIn: 'root',
})
export class SnackbarRef {
	private _portal = inject(Portal);
	private _component!: ComponentRef<unknown>;

	public showSnackbar(options: SnackbarOptions) {
		if (this._component) return;
		const injector = Injector.create([]);

		const componentRef = this._portal.createPortal(SnackbarComponent, injector);
		componentRef.instance.template = options.template;
		componentRef.instance.message = options.message;
		componentRef.changeDetectorRef.detectChanges();
	}

	public hideSnackbar() {
		if (!this._component) return;
		this._portal.destroyPortal(this._component);
		this._component.destroy();
	}
}
