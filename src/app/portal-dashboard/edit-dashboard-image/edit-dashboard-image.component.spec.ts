import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDashboardImageComponent } from './edit-dashboard-image.component';

describe('EditDashboardImageComponent', () => {
  let component: EditDashboardImageComponent;
  let fixture: ComponentFixture<EditDashboardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDashboardImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDashboardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
