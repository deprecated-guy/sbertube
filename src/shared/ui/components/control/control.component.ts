import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	HostBinding,
	inject,
	Input,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShowPasswordDirective } from '@ui';

function convertToPx(v: number) {
	return v + 'px';
}
// eslint-disable-next-line @angular-eslint/template/interactive-supports-focus
@Component({
	selector: 'sb-control',
	standalone: true,
	imports: [CommonModule, ShowPasswordDirective],
	template: `<div [style.height]="height" [style.width]="width">
		<input
			[class.error]="control?.touched && control?.dirty && control?.errors"
			[class.valid]="control?.valid"
			class="border-none outline-none"
			#input
			[value]="inputValue"
			[type]="type"
			[name]="inputName"
			[style.padding-left]="paddingX"
			[style.padding-right]="paddingX"
			[style.padding-top]="paddingY"
			[style.padding-bottom]="paddingY"
			[style.font-size]="fontSize"
			[placeholder]="placeholder"
			(input)="updateValue($event)"
		/>

		<button class="material-icons absolute ml-[89%]" *ngIf="input.value.length > 0 && !inputValue" (click)="onClick()">
			clear
		</button>
		<button
			*ngIf="canSeePassword"
			class="show-pass absolute z-1 ml-[75%] cursor-pointer"
			(click)="handleClick($event)"
			[name]="inputName"
			sbShowPassword
		>
			<span class="material-icons">search</span>
		</button>
	</div> `,
	styleUrls: ['./control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => ControlComponent) }],
})
export class ControlComponent implements ControlValueAccessor {
	@ViewChild('input', { read: ElementRef<HTMLInputElement> })
	private input!: ElementRef<HTMLInputElement>;

	@Input() placeholder = '';

	@Input() type = 'text';

	@Input() inputName: 'password' | 'repeat' | '' = '';

	@Input() canSeePassword = false;

	@Input({ transform: (v: number) => convertToPx(v) }) paddingX = 0;

	@Input({ transform: (v: number) => convertToPx(v) }) paddingY = 5;

	@Input({ transform: (v: number) => convertToPx(v) }) fontSize = 15;

	@Input() inputValue: unknown = '';

	@Input({ transform: (v: number) => convertToPx(v) }) height = 30;

	@Input({ transform: (v: number) => convertToPx(v) }) width = 30;

	@Input() control!: AbstractControl;

	private elRef = inject(ElementRef);
	private hidePass = false;
	private renderer = inject(Renderer2);
	public value = '';

	@HostBinding('attr.aria-name')
	get name() {
		return 'sb-control';
	}

	@HostBinding('attr.aria-class')
	get class() {
		return 'sb-control';
	}

	protected onChange = (v: unknown) => {};
	protected onTouch = () => {};
	registerOnChange(fn: (v: unknown) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.renderer.setProperty(this.elRef.nativeElement, 'disabled', isDisabled);
	}

	writeValue(obj: string): void {
		this.value = obj;
		this.control.markAsDirty();
	}

	protected updateValue(e: Event) {
		this.value = (e.target as HTMLInputElement).value;
		this.onChange((e.target as HTMLInputElement).value);
		this.onTouch();
	}

	protected onClick() {
		if (this.control) this.control.setValue('');
		this.value = '';
		this.input.nativeElement.value = '';
	}

	handleClick(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		this.hidePass = !this.hidePass;
	}
}
