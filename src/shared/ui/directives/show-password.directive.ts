import { Directive, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[sbShowPassword]',
	standalone: true,
})
export class ShowPasswordDirective implements OnInit {
	private elRef = inject(ElementRef);
	@Input({ required: true }) name: 'password' | 'repeat' | '' = '';
	private input!: HTMLInputElement;

	ngOnInit() {
		this.input = this.elRef.nativeElement.form[this.name];
	}
	@HostListener('mousedown', ['$event'])
	onMouseDown(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		const input = this.input;
		if (input) input.type = 'text';
	}
	@HostListener('mouseup', ['$event'])
	onMouseUp(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		const input = this.input;
		if (input) input.type = 'password';
	}
}
