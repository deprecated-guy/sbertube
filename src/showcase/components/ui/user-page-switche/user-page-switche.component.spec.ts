import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageSwitcheComponent } from './user-page-switche.component';

describe('UserPageSwitcheComponent', () => {
  let component: UserPageSwitcheComponent;
  let fixture: ComponentFixture<UserPageSwitcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageSwitcheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPageSwitcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
