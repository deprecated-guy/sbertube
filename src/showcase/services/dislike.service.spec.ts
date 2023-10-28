import { TestBed } from '@angular/core/testing';

import { DislikeService } from './dislike.service';

describe('DislikeService', () => {
	let service: DislikeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DislikeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
