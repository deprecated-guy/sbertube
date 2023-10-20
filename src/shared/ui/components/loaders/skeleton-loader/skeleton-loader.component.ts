import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-skeleton-loader',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './skeleton-loader.component.html',
	styleUrls: ['./skeleton-loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
	@Input({ required: true }) width = '50px';
	@Input({ required: true }) height = '5px';
}
