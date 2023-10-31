import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-icon',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<svg
		class="z-2 flex items-center justify-center {{ class }}"
		[attr.width]="width"
		[attr.height]="height"
		viewBox="0 0 24 24"
	>
		<use [style.stroke]="fillColor" [attr.xlink:href]="iconName"></use>
	</svg>`,
})
export class IconComponent {
	@Input({ transform: (v: number) => v + 'px' }) width = 24;
	@Input({ transform: (v: number) => v + 'px' }) height = 24;
	@Input() name = '';
	@Input() iconPath = '';
	@Input() icon = '';
	@Input() class = '';
	@Input() fillColor = '#fff';

	protected get iconName() {
		console.log(this.iconPath);
		return this.iconPath ? this.iconPath + `#${this.name}` : `/assets/icons/${this.icon}.svg#${this.name}`;
	}
}
