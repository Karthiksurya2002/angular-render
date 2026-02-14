import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeShareComponent } from './like-share.component';

describe('LikeShareComponent', () => {
  let component: LikeShareComponent;
  let fixture: ComponentFixture<LikeShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
