import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@shared/types';
import { colorParser } from '@showcase/services';

const makeColorString = (v: string) => {
	const color = colorParser(v);
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
const convertToPx = (v: number) => `${v}px`;
@Component({
	selector: 'sb-user-banner',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './user-banner.component.html',
	styleUrls: ['./user-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBannerComponent {
	@Input() user: User = {} as User;
	@Input({ transform: (v: number) => convertToPx(v) }) fontSize = 21;
	@Input({ transform: (v: string) => makeColorString(v) }) color!: string;
}
