import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from '@showcase/components/ui';
import { AppearanceDirective, IconComponent } from '@ui';

@Component({
	selector: 'sb-button',
	standalone: true,
	imports: [CommonModule, RippleDirective, IconComponent, AppearanceDirective],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	hostDirectives: [{ directive: AppearanceDirective, inputs: ['appearance', 'rounding'] }],
})
export class ButtonComponent {
	@Input() background = 'transparent';
	@Input() imagePath = '';
	@Input() icon = '';
	@Input() width = 24;
	@Input() height = 24;
	@Input() name = '';
	@Input() class = '';
	@Input() rippleColor = 'white';
	@Input() hoverBgColor = '';
	@Input() btnActiveBg = '';
	protected isActive = false;
	protected isHovered = false;
	@Input() appearance: 'standard' | 'upload' | 'warn' | 'delete' = 'standard';
	@Input() rounding: 'default' | 'full' = 'default';
	@Input() fillColor = 'white';

	@HostListener('mouseenter')
	onMouseEnter() {
		this.isHovered = true;
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.isHovered = false;
	}

	@HostListener('mousedown')
	onMouseDown() {
		this.isActive = true;
	}

	@HostListener('mousemove')
	onMouseMove() {
		this.isActive = true;
	}

	@HostListener('mouseup')
	onMouseUp() {
		this.isActive = false;
	}

	protected get iconPath() {
		return this.imagePath ? this.imagePath : this.icon;
	}
}
