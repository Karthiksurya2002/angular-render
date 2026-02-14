import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeReportComponent } from './iframe-report.component';

describe('IframeReportComponent', () => {
  let component: IframeReportComponent;
  let fixture: ComponentFixture<IframeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IframeReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IframeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
