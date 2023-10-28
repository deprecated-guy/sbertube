import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'sb-slider-range',
	templateUrl: './slider-range.component.html',
	styleUrls: ['./slider-range.component.scss'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class SliderRangeComponent implements AfterViewInit {
	@Input() min = 0;
	@Input() max = 100;
	@Input() step = 1;

	@Input() valueMin = 10;
	@Output() valueMinChange: EventEmitter<number> = new EventEmitter();

	@Input() valueMax = 90;
	@Output() valueMaxChange: EventEmitter<number> = new EventEmitter();

	slide1 = 0;
	slide2 = 0;

	constructor() {}

	ngAfterViewInit(): void {
		const sliderSections = document.getElementsByClassName('range-slider');
		for (let x = 0; x < sliderSections.length; x++) {
			const sliders = sliderSections[x].getElementsByTagName('input');
			for (let y = 0; y < sliders.length; y++) {
				if (sliders[y].type === 'range') {
					// eslint-disable-next-line @typescript-eslint/no-this-alias
					const self = this;
					sliders[y].oninput = function () {
						self.getVals(this);
					};
					// Manually trigger event first time to display values
					// sliders[y].oninput?(null);
				}
			}
		}
	}

	getVals(self) {
		// Get slider values
		const parent = self.parentNode;
		const slides = parent.getElementsByTagName('input');
		let slide1 = parseFloat(slides[0].value);
		let slide2 = parseFloat(slides[1].value);
		// Neither slider will clip the other, so make sure we determine which is larger
		if (slide1 > slide2) {
			const tmp = slide2;
			slide2 = slide1;
			slide1 = tmp;
		}
		this.valueMinChange.emit(slide1);
		this.valueMaxChange.emit(slide2);
		this.slide1 = slide1;
		this.slide2 = slide2;
	}
}
