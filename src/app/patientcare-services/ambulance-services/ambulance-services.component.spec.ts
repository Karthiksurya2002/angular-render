import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceServicesComponent } from './ambulance-services.component';

describe('AmbulanceServicesComponent', () => {
  let component: AmbulanceServicesComponent;
  let fixture: ComponentFixture<AmbulanceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmbulanceServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
