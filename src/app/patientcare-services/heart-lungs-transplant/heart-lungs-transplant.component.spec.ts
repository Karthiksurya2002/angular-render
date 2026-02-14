import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartLungsTransplantComponent } from './heart-lungs-transplant.component';

describe('HeartLungsTransplantComponent', () => {
  let component: HeartLungsTransplantComponent;
  let fixture: ComponentFixture<HeartLungsTransplantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeartLungsTransplantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartLungsTransplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
