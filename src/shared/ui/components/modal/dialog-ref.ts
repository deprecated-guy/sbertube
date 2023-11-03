import { ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObservableData } from '../sidebar/types/observable-data';
import { ComponentData, ComponentSettings, ComponentType } from '../sidebar/types';
import { COMPONENT_DATA } from '../sidebar/token/COMPONENT_DATA';
import { Portal } from '@cdk';

@Injectable({
	providedIn: 'root',
})
export class DialogRef {
	private portal = inject(Portal);
	private _afterClosed = new Subject<ObservableData<unknown> | null>();
	private _beforeClosed = new Subject<ObservableData<unknown> | null>();
	private _afterCreated = new Subject<ObservableData<unknown> | null>();
	private _beforeCreated = new Subject<ObservableData<unknown> | null>();

	private _component!: ComponentRef<unknown>;
	private _data!: ComponentData;

	/**
	 * @description this method creates stream which open modal window
	 *
	 * @params component: which comes to window
	 * @params settings:  simple settings for output window
	 * @params data: Additions data for component(not necessary)
	 * */
	public open(
		/**
		 * @typeParams ype ComponentType<T = unknown> = Type<unknown>;
		 *
		 * */
		component: ComponentType,
		/**
		 * @typeParams
		 * interface ComponentSettings {
		 *    width?: number | string;
		 *		height?: number | string;
		 *		background?: string;
		 *  	template?: TemplateRef<unknown>;
		 *		isBackdrop?: boolean;
		 *		class?: 'sm' | 'lg' | 'full' | 'submit' | 'user-editor';
		 * }
		 *
		 * */
		settings: ComponentSettings,
		/**
		 * @typeParam [key:string]: T
		 *
		 *
		 * */

		data?: ComponentData,
	) {
		this._data = data as ComponentData;

		if (this._component) this.close();

		return new Observable((subscriber) => {
			/**
			 * creating injector for our component
			 * **/

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
				isSubscribed: true,
				isDestructed: false,
			});
		});
	}

	/**
	 * @method this method will assign settings for our modal window
	 *
	 * @params injector -  providers injector. It's need for if we want to provide unnecessary property DATA to our modal
	 * **/
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

	/**
	 * @params newData - any data
	 * @description we can get any debug info from our modal before closing a modal by calling this method
	 * **/
	public beforeClosed(newData?: ComponentData) {
		this._beforeClosed.next(newData as ComponentData | null);
		return this._beforeClosed.asObservable();
	}

	/**
	 * @param newData - any data
	 * @description we can get any debug info from our modal after closing a modal by calling this method or we can
	 * **/
	public afterClosed(newData?: ComponentData) {
		this._afterClosed.next(newData as ComponentData | null);
		return this._afterClosed.asObservable();
	}

	/**
	 * @description this method remove our window and complete all other observables(modal)
	 */

	public close() {
		this._component.destroy();
		this._beforeClosed.complete();
		this._afterClosed.complete();
		this._afterCreated.complete();
		this._beforeCreated.complete();
		this.portal.destroyPortal(this._component);
		this._component.destroy();
	}
}
