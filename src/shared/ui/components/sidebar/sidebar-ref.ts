import { ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComponentData, ComponentSettings, ComponentType } from './types';
import { COMPONENT_DATA } from './token/COMPONENT_DATA';
import { ObservableData } from './types/observable-data';
import { Portal } from '@cdk';

@Injectable({
	providedIn: 'root',
})
export class SidebarRef {
	private portal = inject(Portal);
	private _afterClosed = new Subject<ObservableData<unknown> | null>();
	private _beforeClosed = new Subject<ObservableData<unknown> | null>();
	private _afterCreated = new Subject<ObservableData<unknown> | null>();
	private _beforeCreated = new Subject<ObservableData<unknown> | null>();

	private _component!: ComponentRef<unknown>;
	private _data!: ComponentData;

	public open(component: ComponentType, settings: ComponentSettings, data?: ComponentData) {
		this._data = data as ComponentData;

		if (this._component) this.close();

		return new Observable((subscriber) => {
			const injector = Injector.create([{ provide: COMPONENT_DATA, useValue: this._data }]);

			const componentRef: ComponentRef<unknown> = this.portal.createPortal(component, injector);
			this._component = componentRef;

			this.getInstanceAndAssignData(componentRef, settings);
			this.assignAllObservables(injector, settings, data);
			subscriber.next({
				createdComponent: this._component,
				injector,
				settings,
				data,
				isSubscribed: false,
				isDestructed: false,
			});
		});
	}

	private assignAllObservables(
		injector: Injector,
		settings: ComponentSettings,
		data: ComponentData<unknown> | undefined,
	) {
		this._beforeCreated.next(null);
		this._beforeClosed.next(null);
		this._afterClosed.next(null);

		this._afterCreated.next({
			createdComponent: this._component,
			injector,
			settings,
			data,
			isSubscribed: false,
			isDestructed: false,
		});
	}

	private getInstanceAndAssignData(componentRef: ComponentRef<any>, settings: ComponentSettings) {
		const instance = componentRef.instance;
		instance.width = settings.width;
		instance.height = settings.height;
		instance.background = settings.background;
		instance.template = settings.template;
		instance.isBackdrop = settings.isBackdrop;
		instance.class = settings.class;
		componentRef.changeDetectorRef.detectChanges();
	}
	public beforeCreated(newData?: ComponentData) {
		this._beforeCreated.next(newData as ComponentData | null);
		return this._beforeCreated.asObservable();
	}
	public afterCreated(newData?: ComponentData) {
		this._afterCreated.next(newData as ComponentData | null);
		return this._afterCreated.asObservable();
	}
	public beforeClosed(newData?: ComponentData) {
		this._beforeClosed.next(newData as ComponentData | null);
		return this._beforeClosed.asObservable();
	}

	public afterClosed(newData?: ComponentData) {
		this._afterClosed.next(newData as ComponentData | null);
		return this._afterClosed.asObservable();
	}

	public close() {
		this._component.destroy();
		this._beforeClosed.complete();
		this._afterClosed.complete();
		this._afterCreated.complete();
		this._beforeCreated.complete();
		this.portal.destroyPortal(this._component);
	}
}
