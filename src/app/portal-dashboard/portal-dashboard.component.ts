import { Component } from '@angular/core';
import { ServicePortalService } from '../service-portal.service';
import { Route, Router } from '@angular/router';
import { EditDashboardImageComponent } from './edit-dashboard-image/edit-dashboard-image.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPatientCareServicesComponent } from './edit-patient-care-services/edit-patient-care-services.component';
import { HttpClient } from '@angular/common/http';
import { EdidHospitalBestLogoComponent } from './edid-hospital-best-logo/edid-hospital-best-logo.component';
import { EditHospitalInfoComponent } from './edit-hospital-info/edit-hospital-info.component';
import { EditHospitalFacilitiesComponent } from './edit-hospital-facilities/edit-hospital-facilities.component';
import { AuthServiceService } from '../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-portal-dashboard',
  standalone: false,
  templateUrl: './portal-dashboard.component.html',
  styleUrl: './portal-dashboard.component.css',
})
export class PortalDashboardComponent {
  editAccess: any = false;
  imageUrl: any;
  description: any;
  title: any;
  buttonName: any;
  images: any = {};
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  certificsLogoImage: any;
  facilitiesDetails: any;
  titleFacilities: any;
  imageFacilities: any;
  dashboard: any;
  constructor(
    private ServicePortalService: ServicePortalService,
    private route: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private AuthServiceService: AuthServiceService,
  ) {}
  ngOnInit(): void {
    const role = this.AuthServiceService.getUserRole();
    console.log('role.............', role);
    if (role === 'Admin') {
      this.editAccess = true;
      this.route.navigateByUrl('/dashboard');
    }
    this.updateDashBoardImage();
    this.getDashboardData();
    this.getPatientCareImage();
    this.getCertificsLogo();
    this.getFacilitiesDeatils();
    this.getImageFacilities();
    this.getQuickDeatils();
  }

  editAdmin(event: any) {
    console.log(event);
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: 'Dashboard',
      });
      data.afterClosed().subscribe((res: any) => {
        if (res) {
          this.updateDashBoardImage();
        }
      });
    } else if (event === 'option') {
      this.dialog.open(EditPatientCareServicesComponent, {
        maxWidth: '100vw',
        height: '500px',
        maxHeight: '100vh',
      });
    } else if (event === 'hospitalInfo') {
      const data = this.dialog.open(EditHospitalInfoComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
      });
      data.afterClosed().subscribe((res: any) => {
        if (res) {
          this.getDashboardData();
        }
      });
    } else if (event === 'hospitalBestLogo') {
      const data = this.dialog.open(EdidHospitalBestLogoComponent, {
        maxWidth: '100vw',
        //  maxWidth: '700px',
        maxHeight: '100vh',
      });
      data.afterClosed().subscribe((res: any) => {
        this.getCertificsLogo();
      });
    } else if (event === 'hospitalFacilities') {
      const data = this.dialog.open(EditHospitalFacilitiesComponent, {
        maxWidth: '100vw',
        //  maxWidth: '700px',
        maxHeight: '100vh',
      });
      data.afterClosed().subscribe((res: any) => {
        this.getFacilitiesDeatils();
        this.getImageFacilities();
      });
    }
  }
  updateDashBoardImage() {
    this.ServicePortalService.getDashboardImage('Dashboard').subscribe(
      (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob);
      },
    );
  }
  // openBookAppointment() {
  //   this.route.navigateByUrl('/book-appointment');
  // }
  getDashboardData() {
    this.ServicePortalService.getDashboardInformation().subscribe(
      (res: any) => {
        console.log(res);
        this.title = res[0]?.title;
        this.description = res[0]?.description;
        this.buttonName = res[0]?.buttonName;
      },
    );
  }
  getPatientCareImage() {
    this.ServicePortalService.getPatientCareImage().subscribe((res: any) => {
      console.log(res);
      this.image1 = `data:image/jpeg;base64,${res[0]?.base64}`;
      this.image2 = `data:image/jpeg;base64,${res[1]?.base64}`;
      this.image3 = `data:image/jpeg;base64,${res[2]?.base64}`;
      this.image4 = `data:image/jpeg;base64,${res[3]?.base64}`;
      this.image5 = `data:image/jpeg;base64,${res[4]?.base64}`;
    });
  }
  getCertificsLogo() {
    this.ServicePortalService.getCertificsLogo().subscribe((blob: Blob) => {
      this.certificsLogoImage = URL.createObjectURL(blob);
    });
  }
  getFacilitiesDeatils() {
    this.ServicePortalService.getFacilitiesDeatils().subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.buttonName = res?.data?.buttonFacilitiesName;
        this.titleFacilities = res.data?.titleFacilities;

        const value = res?.data?.facilitiesDetails[0];
        this.facilitiesDetails = value
          ?.split(',')
          .map((res: any) => res.trim());
        console.log(this.facilitiesDetails);
      }
    });
  }
  getImageFacilities() {
    this.ServicePortalService.getImageFacilities().subscribe((blob: Blob) => {
      this.imageFacilities = URL.createObjectURL(blob);
    });
  }
  routeService() {
    console.log('router');
    this.route.navigateByUrl('/services');
  }
  routerToPage(route: any) {
    if (route == 'heart&lungstransplant') {
      this.route.navigateByUrl('patientcare/heart-lungs-transplant');
    } else if (route == 'bookappointment') {
      this.route.navigateByUrl('patientcare/book-appointment');
    } else if (route == 'superSpecialties') {
      this.ServicePortalService.updateData('superSpecialties');
      this.route.navigateByUrl('patientcare/book-appointment');
    }
  }
  getQuickDeatils() {
    this.ServicePortalService.getQuickDeatils().subscribe((res: any) => {
      console.log(res);
      this.dashboard = res?.data;
    });
  }
  getAvgApprovalText(mins: number): string {
    if (mins < 60) return mins + ' mins';
    if (mins < 1440) return Math.round(mins / 60) + ' hrs';
    return Math.round(mins / 1440) + ' days';
  }
}
