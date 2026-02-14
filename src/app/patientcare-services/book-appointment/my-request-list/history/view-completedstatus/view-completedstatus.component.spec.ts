import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedstatusComponent } from './view-completedstatus.component';

describe('ViewCompletedstatusComponent', () => {
  let component: ViewCompletedstatusComponent;
  let fixture: ComponentFixture<ViewCompletedstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCompletedstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompletedstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
