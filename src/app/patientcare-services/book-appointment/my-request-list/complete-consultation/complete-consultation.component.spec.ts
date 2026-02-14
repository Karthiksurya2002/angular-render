import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteConsultationComponent } from './complete-consultation.component';

describe('CompleteConsultationComponent', () => {
  let component: CompleteConsultationComponent;
  let fixture: ComponentFixture<CompleteConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
