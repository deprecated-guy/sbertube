import { InjectionToken } from '@angular/core';

export type ComponentData<T = unknown> = { [data: string]: T };

export const COMPONENT_DATA = new InjectionToken<ComponentData>('');
