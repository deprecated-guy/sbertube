import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	HostBinding,
	HostListener,
	inject,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputExtensionDirective, ShowPasswordDirective } from '@shared/ui/directives';
import { animate, state, style, transition, trigger } from '@angular/animations';

function convertToPx(v: number) {
	return v + 'px';
}

@Component({
	selector: 'sb-control',
	standalone: true,
	animations: [
		trigger('moveUp', [
			state('void', style({ transform: 'translateY(0) translateX(0)' })),
			state(
				'*',
				style({
					transform: 'translateY(-19px) translateX(5px)',
					background: 'white',
					fontSize: 10,
					padding: '0 3px',
				}),
			),
			transition('void<=>*', [animate('200ms')]),
		]),
	],
	imports: [CommonModule, ShowPasswordDirective, InputExtensionDirective],
	template: `<div class="relative" #container sbInputExtension [appearance]="appearance">
		<label for="control" class="absolute" [@moveUp]="state">{{ text }}</label>

		<input
			id="control"
			[class.error]="control?.touched && control?.dirty && control?.errors"
			[class.valid]="control?.valid"
			class=""
			#input
			[autocomplete]="enableAutocomplete"
			[value]="inputValue"
			[type]="type"
			[name]="inputName"
			[style.padding-left]="paddingX"
			[style.padding-right]="paddingX"
			[style.padding-top]="paddingY"
			[style.padding-bottom]="paddingY"
			[style.font-size]="fontSize"
			[disabled]="isDisabled"
			[placeholder]="state === '*' ? placeholder : ''"
			(input)="updateValue($event)"
			(focus)="onFocus($event)"
			(blur)="onBlur($event)"
			[attr.aria-autocomplete]="enableAutocomplete"
		/>

		<button
			class=" flex material-icons ml-[75%]  z-2 absolute "
			*ngIf="input.value.length > 0 && !inputValue"
			(click)="onClick(input)"
			[ngClass]="{
				'ml-[76%] mt-[6px]': canSeePassword,
				'ml-[85%] mt-[5px]': appearance === 'floated' && !canSeePassword
			}"
		>
			clear
		</button>
		<button
			*ngIf="canSeePassword"
			class="show-pass absolute z-1 mt-[5px] ml-[85%] cursor-pointer"
			(click)="handleClick($event)"
			[name]="inputName"
			sbShowPassword
		>
			<span class="material-icons">search</span>
		</button>
		<i *ngIf="appearance === 'primitive'"></i>
	</div> `,
	styleUrls: ['./control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => ControlComponent) }],
})
export class ControlComponent implements ControlValueAccessor, OnInit {
	@ViewChild('input', { read: ElementRef<HTMLInputElement> })
	private _input!: ElementRef<HTMLInputElement>;
	@ViewChild('container', { read: ElementRef<HTMLDivElement> })
	private _container!: ElementRef<HTMLInputElement>;

	@Input() placeholder = '';
	@Input() type = 'text';
	@Input() enableAutocomplete: 'none' | 'list' | 'inline' | 'off' = 'off';
	@Input() text = '';
	@Input() inputName: 'password' | 'repeat' | '' = '';
	@Input() canSeePassword = false;
	@Input({ transform: (v: number) => convertToPx(v) }) paddingX = 0;
	@Input({ transform: (v: number) => convertToPx(v) }) paddingY = 5;
	@Input({ transform: (v: number) => convertToPx(v) }) fontSize = 15;
	@Input() inputValue: unknown = '';
	@Input({ transform: (v: number) => convertToPx(v) }) height = 30;
	@Input({ transform: (v: number) => convertToPx(v) }) width = 30;
	@Input() isDisabled = false;
	@Input() appearance: 'primitive' | 'floated' = 'primitive';

	@Input() control!: AbstractControl;
	protected state = 'void';
	private _elRef = inject(ElementRef);
	private _hidePass = false;
	private _renderer = inject(Renderer2);
	protected value = '';

	@HostBinding('attr.aria-name')
	get name() {
		return 'sb-control';
	}

	@HostBinding('attr.aria-class')
	get class() {
		return 'sb-control';
	}
	@HostBinding('attr.aria-autocomplete')
	get ariaAutocomplete() {
		return 'off';
	}

	@HostBinding('aria-autocomplete')
	get autocomplete() {
		return 'off';
	}

	protected onChange = (v: unknown) => {};

	protected onTouch = () => {};

	@HostListener('document:click', ['$event'])
	onDocumentClick(e: MouseEvent) {}

	registerOnChange(fn: (v: unknown) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this._renderer.setProperty(this._elRef.nativeElement, 'disabled', isDisabled);
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

	protected onClick(element: HTMLInputElement) {
		if (this.control) this.control.setValue('');
		this.value = '';
		this._input.nativeElement.value = '';
		element.value = '';
		this.onBlur();
	}

	protected handleClick(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		this._hidePass = !this._hidePass;
	}

	protected onFocus(event: FocusEvent) {
		this.state = '*';
		if (this._elRef.nativeElement.value !== '') this.state = '*';
	}

	onBlur(event?: Event) {
		if (this._input.nativeElement.value || this.inputValue !== '') return;
		this.state = 'void';
	}

	ngOnInit() {
		console.log(this.inputValue);
		this._elRef.nativeElement.style.width = this.width;
		this._elRef.nativeElement.style.height = this.height;
		if (this._elRef.nativeElement.value !== '') this.state = '*';
	}
}
