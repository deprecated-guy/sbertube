import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	inject,
	NgZone,
	Output,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '@shared/ui';

@Component({
	selector: 'sb-control-file',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './control-file.component.html',
	styleUrls: ['./control-file.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useClass: forwardRef(() => ControlFileComponent) }],
})
export class ControlFileComponent implements ControlValueAccessor {
	@ViewChild('container', { read: ElementRef<HTMLDivElement> })
	private _element!: ElementRef<HTMLDivElement>;

	@ViewChild('loading', { read: ElementRef<HTMLDivElement> })
	private _loading!: ElementRef<HTMLDivElement>;
	private _ngZone = inject(NgZone);

	@Output() outputFile = new EventEmitter<File>();
	protected _file!: File;

	private _onChange = (v: unknown): void => {};
	private _onTouch = () => {};
	protected isLoading = false;

	registerOnChange(fn: (obj: unknown) => unknown): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._onTouch = fn;
	}

	writeValue(obj: File): void {
		this._file = obj;
		this._onChange(obj);
		this._onTouch();
	}

	protected changeControl(event: Event) {
		const target = <HTMLInputElement>event.target;
		let file: File = <File>{};
		if (target.files) {
			file = target.files[0];
			this._file = file;

			console.log(this._file);
		}
		if (file) {
			this.isLoading = true;
			this._loading.nativeElement.classList.remove('hidden');
			this._element.nativeElement.classList.add('hidden');

			this._ngZone.runOutsideAngular(() =>
				setTimeout(() => {
					this._onChange(file);
					this.outputFile.emit(this._file);
					this._element.nativeElement.classList.remove('hidden');
					this._loading.nativeElement.classList.add('hidden');
				}, 5000),
			);
		}
	}
}
