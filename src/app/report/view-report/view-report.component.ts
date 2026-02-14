import { Component, ViewChild } from '@angular/core';
import { ServicePortalService } from '../../service-portal.service';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDashboardImageComponent } from '../../portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CancelAppointmentComponent } from '../../patientcare-services/book-appointment/my-request-list/cancel-appointment/cancel-appointment.component';
import { CancelApprovedAppointmentComponent } from '../../patientcare-services/book-appointment/my-request-list/cancel-approved-appointment/cancel-approved-appointment.component';
import { CompleteConsultationComponent } from '../../patientcare-services/book-appointment/my-request-list/complete-consultation/complete-consultation.component';
import { HistoryComponent } from '../../patientcare-services/book-appointment/my-request-list/history/history.component';
import { ViewDetailsComponent } from '../../patientcare-services/book-appointment/my-request-list/view-details/view-details.component';
import { IframeReportComponent } from './iframe-report/iframe-report.component';
@Component({
  selector: 'app-view-report',
  standalone: false,
  templateUrl: './view-report.component.html',
  styleUrl: './view-report.component.css',
})
// export class ViewReportComponent {
//   id: any;
//   role: any;
//   imageUrl: any;
//   editAccess: any;
//   totalRecords: any;
//   constructor(
//     private service: ServicePortalService,
//     private AuthServiceService: AuthServiceService,
//     private dialog: MatDialog,
//     private ServicePortalService: ServicePortalService,
//   ) {}
//   displayedColumns: string[] = [
//     'opNumber',
//     'patientName',
//     'doctor',
//     'appointmentCreatedAt',
//     'date',
//     'slot',
//     'status',
//     'actions',
//   ];

//   dataSource = new MatTableDataSource<any>([]);
//   timeSlots: any;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   ngOnInit() {
//     this.role = this.AuthServiceService.getUserRole();
//     this.editAccess = this.role == 'Admin' ? true : false;
//     this.id = this.AuthServiceService.getUserId();
//     this.getReport();
//     this.getAppointmentList('User');
//     this.updateImage();
//   }
//   getReport() {
//     this.service.getReports(this.id).subscribe((res: any) => {});
//   }
//   editImage() {
//     const data = this.dialog.open(EditDashboardImageComponent, {
//       width: '45vw',
//       height: '45vh',
//       data: 'PatientRecordsImage',
//     });
//     data.afterClosed().subscribe((res: any) => {
//       console.log(res);

//       this.updateImage();
//     });
//   }
//   updateImage() {
//     this.ServicePortalService.getDashboardImage(
//       'PatientRecordsImage',
//     ).subscribe((blob: Blob) => {
//       this.imageUrl = URL.createObjectURL(blob);
//     });
//   }
//   getAppointmentList(type: any) {
//     const userId = Number(this.AuthServiceService.getUserId());
//     this.ServicePortalService.getAppointmentList(userId, type).subscribe(
//       (res: any) => {
//         console.log(res);
//         const data = res?.data || [];
//         this.totalRecords = data.length;
//         this.dataSource.data = data?.map((item: any) => ({
//           opNumber: item?.opNumber,
//           patientName: item?.patientFirstName + ' ' + item?.patientLastName,
//           doctor: item?.patientDoctorName,
//           appointmentCreatedAt: item?.appointmentCreatedAt,
//           date: new Date(item?.patientPreferredDate),
//           slot:
//             item?.selectedSlot == null ? 'Slot Cancelled' : item?.selectedSlot,
//           status:
//             item?.appointmentStatus == null
//               ? 'Pending'
//               : item?.appointmentStatus,
//           data: item,
//         }));
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       },
//     );
//   }
//   applyFilter(event: Event) {
//     const value = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = value.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }
export class ViewReportComponent {
  displayedColumns: string[] = [
    'opNumber',
    'patientName',
    'doctor',
    'appointmentCreatedAt',
    'date',
    'slot',
    'status',
    'download',
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
  dataa: any;
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
      this.getReports('Admin');
    } else if (this.role == 'User') {
      this.getReports('User');
    } else if (this.role == 'Doctor') {
      this.getReports('Doctor');
      this.editDoctor = true;
    }
    this.updateImage();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getReports(type: any) {
    const userId = Number(this.authService.getUserId());
    this.ServicePortalService.getReports(userId, type).subscribe((res: any) => {
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
          item?.appointmentStatus == null ? 'Pending' : item?.appointmentStatus,
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

  editRequestListImage(event: any) {
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: 'PatientRecordsImage',
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);

        this.updateImage();
      });
    }
  }
  updateImage() {
    this.ServicePortalService.getDashboardImage(
      'PatientRecordsImage',
    ).subscribe((blob: Blob) => {
      this.imageUrl = URL.createObjectURL(blob);
    });
  }
  getIframe(row: any) {
    console.log(row);
    this.dataa = row;
    this.printPrescription();
    // this.dialog.open(IframeReportComponent, {
    //   width: '60vh',
    //   data: row,
    // });
  }
  printPrescription() {
    setTimeout(() => {
      const content = document.getElementById('print-content')?.innerHTML || '';
      const title =
        document.getElementById('printTitle')?.innerHTML || 'SHMP Hospital';

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';

      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      iframeDoc?.open();

      iframeDoc?.write(`
      <html>
        <head>
          <title>SHMP Hospital - Prescription</title>
          <style>
            @page {
              margin: 20mm;
            }

            body {
              font-family: Arial, sans-serif;
              color: #000;
            }

            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }

            .logo {
              width: 80px;
              height: 80px;
              border: 1px solid #ccc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            }
              .logo img{
               width: 80px;
              height: 80px;
              }

            .hospital-name {
              text-align: center;
              flex: 1;
            }

            h1 {
              margin: 0;
              font-size: 20px;
            }

            h2 {
              text-align: center;
              margin-top: 10px;
            }

            p {
              margin: 6px 0;
              font-size: 14px;
            }

            .footer {
              margin-top: 40px;
              border-top: 1px solid #000;
              padding-top: 10px;
              font-size: 12px;
              text-align: center;
            }

            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div class="logo">
             <img src="/logo.png">
            </div>

            <div class="hospital-name">
              <h1>${title}</h1>
              <div>Official Medical Prescription</div>
            </div>

            <div style="width:80px;"></div>
          </div>

          ${content}

          <div class="footer">
            This is a system generated prescription from SHMP Hospital ,<br/>
            Thank you.
          </div>

          <script>
            window.onload = function () {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);

      iframeDoc?.close();
    }, 300);
  }
}
