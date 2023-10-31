import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoActionComponent } from './video-action.component';

describe('VideoActionComponent', () => {
  let component: VideoActionComponent;
  let fixture: ComponentFixture<VideoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
