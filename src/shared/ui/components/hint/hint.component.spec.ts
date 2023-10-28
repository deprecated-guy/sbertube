import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintComponent } from './hint.component';

describe('HintComponent', () => {
	let component: HintComponent;
	let fixture: ComponentFixture<HintComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HintComponent],
		});
		fixture = TestBed.createComponent(HintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
