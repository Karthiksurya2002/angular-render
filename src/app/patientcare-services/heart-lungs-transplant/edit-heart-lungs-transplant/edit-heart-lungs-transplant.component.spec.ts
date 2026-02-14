import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeartLungsTransplantComponent } from './edit-heart-lungs-transplant.component';

describe('EditHeartLungsTransplantComponent', () => {
  let component: EditHeartLungsTransplantComponent;
  let fixture: ComponentFixture<EditHeartLungsTransplantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHeartLungsTransplantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeartLungsTransplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
