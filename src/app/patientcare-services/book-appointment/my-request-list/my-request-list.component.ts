import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicePortalService } from '../../../service-portal.service';
import { AuthServiceService } from '../../../portal-login/auth-service/auth-service.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { MatDialog } from '@angular/material/dialog';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { CancelApprovedAppointmentComponent } from './cancel-approved-appointment/cancel-approved-appointment.component';
import { HistoryComponent } from './history/history.component';
import { EditDashboardImageComponent } from '../../../portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { CompleteConsultationComponent } from './complete-consultation/complete-consultation.component';
@Component({
  selector: 'app-my-request-list',
  standalone: false,
  templateUrl: './my-request-list.component.html',
  styleUrl: './my-request-list.component.css',
})
export class MyRequestListComponent {
  displayedColumns: string[] = [
    'opNumber',
    'patientName',
    'doctor',
    'appointmentCreatedAt',
    'date',
    'slot',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>([]);
  timeSlots: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editAdmin: any = false;
  totalRecords: any;
  role: any;
  editDoctor: boolean = false;
  userId: any;
  data: any;
  imageUrl: any;
  constructor(
    private ServicePortalService: ServicePortalService,
    private authService: AuthServiceService,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.editAdmin = this.authService?.getUserRole() === 'Admin' ? true : false;
    this.role = this.authService?.getUserRole();
    this.userId = this.authService?.getUserId;
    if (this.role == 'Admin') {
      this.getAppointmentList('Admin');
    } else if (this.role == 'User') {
      this.getAppointmentList('User');
    } else if (this.role == 'Doctor') {
      this.getList('Doctor');
      this.editDoctor = true;
    }
    this.updateImage();
    this.getDashboard();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAppointmentList(type: any) {
    const userId = Number(this.authService.getUserId());
    this.ServicePortalService.getAppointmentList(userId, type).subscribe(
      (res: any) => {
        console.log(res);
        const data = res?.data || [];
        this.totalRecords = data.length;
        this.dataSource.data = data?.map((item: any) => ({
          opNumber: item?.opNumber,
          patientName: item?.patientFirstName + ' ' + item?.patientLastName,
          doctor: item?.patientDoctorName,
          appointmentCreatedAt: item?.appointmentCreatedAt,
          date: new Date(item?.patientPreferredDate),
          slot:
            item?.selectedSlot == null ? 'Slot Cancelled' : item?.selectedSlot,
          status:
            item?.appointmentStatus == null
              ? 'Pending'
              : item?.appointmentStatus,
          data: item,
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    );
  }
  getList(type: any) {
    const userId = Number(this.authService.getUserId());
    this.ServicePortalService.getDoctorList(userId).subscribe((res: any) => {
      console.log(res);
      const data = res?.data || [];
      this.totalRecords = data.length;
      this.dataSource.data = data?.map((item: any) => ({
        opNumber: item?.opNumber,
        patientName: item?.patientFirstName + ' ' + item?.patientLastName,
        doctor: item?.patientDoctorName,
        appointmentCreatedAt: item?.appointmentCreatedAt,
        date: new Date(item?.patientPreferredDate),
        slot: item?.selectedSlot,
        status: item?.appointmentStatus,
        data: item,
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getViewAction(row: any) {
    console.log('View action clicked for row:', row);
    this.dialog.open(ViewDetailsComponent, {
      width: '700px',
      data: row.data,
    });
  }
  cancelAppointment(row: any) {
    console.log('Cancel action clicked for row:', row);
    if (row?.status === 'Approved') {
      const dialog = this.dialog.open(CancelApprovedAppointmentComponent, {
        width: '700px',
        data: row.data,
      });
      dialog.afterClosed().subscribe((result: any) => {
        if (result) {
          if (this.role == 'Admin') {
            this.getAppointmentList('Admin');
          } else if (this.role == 'User') {
            this.getAppointmentList('User');
          } else if (this.role == 'Doctor') {
            this.getList('Doctor');
          }
        }
        this.getDashboard();
      });
    } else if (row?.status === 'Pending') {
      const dialog = this.dialog.open(CancelAppointmentComponent, {
        width: '480px',
        data: row.data,
      });
      dialog.afterClosed().subscribe((result: any) => {
        if (result) {
          if (this.role == 'Admin') {
            this.getAppointmentList('Admin');
          } else if (this.role == 'User') {
            this.getAppointmentList('User');
          } else if (this.role == 'Doctor') {
            this.getList('Doctor');
          }
        }
        this.getDashboard();
      });
    } else if (row?.status === 'Rescheduled') {
      const dialog = this.dialog.open(CancelApprovedAppointmentComponent, {
        width: '480px',
        data: row.data,
      });
      dialog.afterClosed().subscribe((result: any) => {
        if (result) {
          if (this.role == 'Admin') {
            this.getAppointmentList('Admin');
          } else if (this.role == 'User') {
            this.getAppointmentList('User');
          } else if (this.role == 'Doctor') {
            this.getList('Doctor');
          }
        }
        this.getDashboard();
      });
    }
  }
  approveAppointment(row: any) {
    this.ServicePortalService.approveAppointment(
      row?.opNumber,
      this.role,
    ).subscribe((res: any) => {
      console.log('Appointment approved:', res);
      if (this.role == 'Admin') {
        this.getAppointmentList('Admin');
      } else if (this.role == 'User') {
        this.getAppointmentList('User');
      } else if (this.role == 'Doctor') {
        this.getList('Doctor');
      }
      this.getDashboard();
    });
  }
  openNowShow(row: any) {
    console.log(row);
    this.ServicePortalService.updateNoShow(row?.opNumber, this.role).subscribe(
      (res: any) => {
        console.log(res);
        if (this.role == 'Admin') {
          this.getAppointmentList('Admin');
        } else if (this.role == 'User') {
          this.getAppointmentList('User');
        } else if (this.role == 'Doctor') {
          this.getList('Doctor');
        }
        this.getDashboard();
      },
    );
  }
  openHistoryDialog(row: any) {
    const dialogRef = this.dialog.open(HistoryComponent, {
      width: '800px',
      maxHeight: '100vh',
      data: row.data,
    });
  }
  getDashboard() {
    const userId = Number(this.authService.getUserId());
    this.ServicePortalService.getDashboard(userId, this.role).subscribe(
      (res: any) => {
        console.log(res);
        this.data = res?.data;
        this.checkStatus();
      },
    );
  }
  editRequestListImage(event: any) {
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: 'requestListImage',
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);

        this.updateImage();
      });
    }
  }
  updateImage() {
    this.ServicePortalService.getDashboardImage('requestListImage').subscribe(
      (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob);
      },
    );
  }
  checkStatus() {
    this.ServicePortalService.checkStatus().subscribe((res: any) => {
      console.log(res);
    });
  }
  openCompleteDialog(row: any) {
    const data = this.dialog.open(CompleteConsultationComponent, {
      minWidth: '99vh',
      maxHeight: '93vh',
      data: row,
    });
    data.afterClosed().subscribe((res: any) => {
      if (this.role == 'Admin') {
        this.getAppointmentList('Admin');
      } else if (this.role == 'User') {
        this.getAppointmentList('User');
      } else if (this.role == 'Doctor') {
        this.getList('Doctor');
      }
      this.getDashboard();
    });
  }
}
