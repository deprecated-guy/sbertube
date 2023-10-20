import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { errorAnimation } from '@ui';
import { BackendErrors } from '@types';

@Component({
	selector: 'sb-server-errors',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './server-errors.component.html',
	styleUrls: ['./server-errors.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [errorAnimation],
})
export class ServerErrorsComponent implements OnInit {
	@Input({ required: true }) error!: BackendErrors;
	ngOnInit() {
		console.log(this.error.message);
	}
}
