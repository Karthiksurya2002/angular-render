import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdidHospitalBestLogoComponent } from './edid-hospital-best-logo.component';

describe('EdidHospitalBestLogoComponent', () => {
  let component: EdidHospitalBestLogoComponent;
  let fixture: ComponentFixture<EdidHospitalBestLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdidHospitalBestLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdidHospitalBestLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
