import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[sbExtendedBtn]',
	standalone: true,
	exportAs: 'extendedBtn',
})
export class AppearanceDirective {
	@Input() appearance: 'standard' | 'upload' | 'warn' | 'delete' = 'standard';
	@Input() rounding: 'full' | 'default' = 'default';

	@HostBinding('class')
	get btnAppearance() {
		return [`sb-appearance-${[this.appearance]}`, `sb-rounding-${[this.rounding]}`];
	}
}
