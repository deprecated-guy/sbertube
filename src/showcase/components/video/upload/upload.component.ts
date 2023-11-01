import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-upload',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {}
