import { TemplateRef } from '@angular/core';

export interface ComponentSettings {
	width?: number | string;
	height?: number | string;
	background?: string;
	template?: TemplateRef<unknown>;
	isBackdrop?: boolean;
	class?: 'sm' | 'lg' | 'full' | 'submit' | 'user-editor';
}
