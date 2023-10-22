import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@shared/types';
import { SkeletonLoaderComponent } from '@shared/ui';
import { IS_MOBILE } from '@di';
import { colorParser } from '@showcase/services';
const makeAsPx = (v: number) => v + 'px';
const makeColorString = (v: string) => {
	const color = colorParser(v);
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
@Component({
	selector: 'sb-user-avatar',
	standalone: true,
	imports: [CommonModule, SkeletonLoaderComponent],
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
	@Input({ required: true }) user!: User;
	@Input({ required: true, transform: (v: number) => makeAsPx(v) }) width = 20;
	@Input({ transform: (v: number) => makeAsPx(v) }) height = 20;
	@Input({ transform: (v: string) => makeColorString(v) }) color!: string;
	@Input({ transform: (v: number) => makeAsPx(v) }) fontSize = 16;
	protected IS_MOBILE$ = inject(IS_MOBILE);

	get firstUsernameLetter() {
		return this.user?.username?.slice(0, 1).toUpperCase();
	}
}
