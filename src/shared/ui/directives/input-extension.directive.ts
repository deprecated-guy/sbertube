import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[sbInputExtension]',
	standalone: true,
})
export class InputExtensionDirective {
	@Input() appearance: 'primitive' | 'floated' = 'primitive';

	@HostBinding('class')
	get computedAppearance() {
		return `sb-${[this.appearance]}`;
	}
}
