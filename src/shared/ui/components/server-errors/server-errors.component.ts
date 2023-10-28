import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrors } from '@types';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'sb-server-errors',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './server-errors.component.html',
	styleUrls: ['./server-errors.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('errorAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-10px)' }),
				animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
			]),
			transition(':leave', [animate('200ms', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
		]),
	],
})
export class ServerErrorsComponent implements OnInit {
	@Input({ required: true }) error!: BackendErrors;
	ngOnInit() {
		console.log(this.error.message);
	}
}
