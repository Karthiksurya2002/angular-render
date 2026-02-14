import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ServicePortalService } from '../../../../service-portal.service';
import { ViewCompletedstatusComponent } from './view-completedstatus/view-completedstatus.component';
@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  historyList: any = [];
  opNumber: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<HistoryComponent>,
    private ServicePortalService: ServicePortalService,
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.getHistoryData();
  }
  getHistoryData() {
    this.ServicePortalService.getAppointmentHistory(
      this.data?.opNumber,
    ).subscribe((res: any) => {
      console.log(res);
      this.historyList = res?.data || [];
    });
  }
  getDetails(event: any) {
    console.log(event);
    this.opNumber = event?.opNumber;
    this.getOpNumberDetails(this.opNumber);
  }
  getOpNumberDetails(id: any) {
    this.dialog.open(ViewCompletedstatusComponent, {
      width: '700px',
      data: id,
    });
  }
}
