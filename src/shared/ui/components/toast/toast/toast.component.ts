import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	Input,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-toast',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit, OnDestroy {
	private elRef = inject(ElementRef<HTMLDivElement>);
	private ngZone = inject(NgZone);
	private animTimer!: any;
	private removeTimer!: any;
	@Input() type: 'success' | 'error' | 'warning' = 'warning';
	@Input() text = '';
	@Input() status = '';

	private get container() {
		return this.elRef.nativeElement.querySelector('.toast') as HTMLDivElement;
	}

	ngOnInit() {
		this.ngZone.runOutsideAngular(() => {
			this.animTimer = setTimeout(() => this.container.classList.add('.toast-out'), 500);
			this.removeTimer = setTimeout(() => this.container.remove(), 600);
		});
	}

	ngOnDestroy() {
		clearTimeout(this.animTimer);
		clearTimeout(this.removeTimer);
	}
}
