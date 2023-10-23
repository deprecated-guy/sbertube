import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@shared/types';
import { colorParser } from '@showcase/services';
import { ButtonComponent } from '@showcase/components/ui';
import { RouterLink } from '@angular/router';

const makeColorString = (v: string) => {
	const color = colorParser(v);
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
const convertToPx = (v: number) => `${v}px`;
@Component({
	selector: 'sb-user-banner',
	standalone: true,
	imports: [CommonModule, ButtonComponent, RouterLink],
	templateUrl: './user-banner.component.html',
	styleUrls: ['./user-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBannerComponent implements OnInit {
	@Input() user: User = {} as User;
	@Input({ transform: (v: number) => convertToPx(v) }) fontSize = 21;
	@Input({ transform: (v: string) => makeColorString(v) }) color = '';
	@Input() rippleColor = '';
	@Input() hoverBgColor = '';
	@Input() btnBgColor = '';

	ngOnInit() {
		console.log(this.hoverBgColor);
		console.log(this.rippleColor);
		console.log(this.btnBgColor);
	}
}
