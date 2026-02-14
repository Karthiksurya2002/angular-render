import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { EditDashboardImageComponent } from '../../portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { ServicePortalService } from '../../service-portal.service';
import { EditSpecialtyDoctorsComponent } from './edit-specialty-doctors/edit-specialty-doctors.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
})
export class BookAppointmentComponent {
  imageUrl: any;
  baTitle: any;
  baSpecialties: any;
  baSpecialtiesCategory: any;
  baOrLabel: any;
  baSearchLabel: any;
  imageUrlDoctor: any;
  imageId: any;
  doctorDeatils: any;
  doctorImageDetails: any;
  mergeAllDoctor: any;
  selectedSpecialty: any;
  noDoctorFound: any = false;
  searchDoctorByName: any;
  searchForm: any;
  editAccess = false;
  selectedShiftDetails: any;
  shiftDetails: any = ['Morning', 'Evening', 'Night'];
  type: any;
  imageType: any = 'bookappointmentimage';
  visibleData: any;
  showDoctors: boolean = false;
  constructor(
    private dialog: MatDialog,
    private ServicePortalService: ServicePortalService,
    private AuthServiceService: AuthServiceService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.ServicePortalService.currentData.subscribe((res: any) => {
      this.visibleData = res;
      if (res == 'superSpecialties') {
        this.imageType = 'superSpecialties';
        this.showDoctors = true;
      } else {
        this.imageType = 'bookappointmentimage';
      }
    });
    const role = this.AuthServiceService.getUserRole();
    console.log('role.............', role);
    if (role === 'Admin') {
      this.editAccess = true;
    }
    this.searchForm = new FormGroup({
      searchByDoctor: new FormControl(''),
    });
    this.searchForm
      .get('searchByDoctor')
      .valueChanges.subscribe((value: any) => {
        this.searchDoctorByName = value;
        this.getDoctor();
      });
    this.updateImage();
    this.getSpeciallites();
    this.getDoctorImage();
  }
  editAdmin(event: any) {
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: this.imageType,
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);

        this.updateImage();
      });
    } else if (event === 'doctorOption') {
      const data = this.dialog.open(EditSpecialtyDoctorsComponent, {
        maxWidth: '99vw',
        maxHeight: '99vh',
        data: 'doctorOption',
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);

        this.getSpeciallites();
      });
    }
    // else if (event == 'doctorList') {
    //   const data = this.dialog.open(EditSpecialtyDoctorsComponent, {
    //     maxWidth: '99vw',
    //     width: '500px',
    //     maxHeight: '99vh',
    //     data: 'doctorList',
    //   });
    //   data.afterClosed().subscribe((res: any) => {
    //     console.log(res);

    //     this.getSpeciallites();
    //   });
    // }
    else if (event == 'addDoctor') {
      const data = this.dialog.open(EditSpecialtyDoctorsComponent, {
        maxWidth: '99vw',
        maxHeight: '99vh',
        data: 'addDoctor',
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);

        this.getSpeciallites();
        this.getDoctorImage();
        this.getDoctor();
      });
    }
  }
  getDoctorImage() {
    this.ServicePortalService.getDashboardImage('doctorImage').subscribe(
      (blob: Blob) => {
        this.imageUrlDoctor = URL.createObjectURL(blob);
      },
    );
  }
  updateImage() {
    this.ServicePortalService.getDashboardImage(this.imageType).subscribe(
      (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob);
      },
    );
  }
  getSpeciallites() {
    this.ServicePortalService.getSpecialties().subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.baTitle = res?.data?.baTitle;
        this.baSpecialties = res?.data?.baSpecialties;
        const raw = res?.data?.baSpecialtiesCategory[0];
        const baSpecialtiesCategory = raw
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.baSpecialtiesCategory = baSpecialtiesCategory;
        this.baOrLabel = res?.data?.baOrLabel;
        this.baSearchLabel = res?.data?.baSearchLabel;
        console.log(this.baSpecialtiesCategory);
        this.selectedSpecialty = this.baSpecialtiesCategory[0];
        this.getDoctor();
      }
    });
  }
  onSelect(event: any) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectedSpecialty = (event.target as HTMLSelectElement).value;
    this.getDoctor();
  }
  onSelectShiftDetails(event: any) {
    console.log(event);
    this.selectedShiftDetails = (event.target as HTMLSelectElement).value;
    this.getDoctor();
  }
  requestAppointment(event: any): void {
    console.log(event);
    this.dialog.open(RequestAppointmentComponent, {
      width: '50vw',
      height: '53vh',
    });
  }
  @ViewChild('shiftSelect') shiftSelect!: ElementRef;

  clearShift() {
    this.shiftSelect.nativeElement.value = '';
  }

  getDoctor() {
    const name =
      this.searchDoctorByName == undefined ? '' : this.searchDoctorByName;
    console.log('searchDoctorByName...', this.searchDoctorByName);
    this.ServicePortalService.getDoctor(
      this.selectedSpecialty,
      name,
      this.selectedShiftDetails == undefined ? '' : this.selectedShiftDetails,
    ).subscribe((res: any) => {
      console.log(res);
      this.doctorDeatils = res?.data;
      if (res?.data == null || res?.data?.length === 0) {
        this.mergeAllDoctor = [];
        this.noDoctorFound = true;
        return;
      }
      this.imageId = res?.data?.map((item: any) => item?.id) ?? [];
      console.log(this.imageId);
      this.getDoctorAllImage(this.imageId);
    });
  }
  getDoctorAllImage(id: any) {
    this.ServicePortalService.getDoctorAllImage(id).subscribe((res: any) => {
      console.log(res);
      this.doctorImageDetails = res;
      console.log(this.doctorImageDetails);
      this.mergeAllDoctor = this.mergeAllDoctorData(
        this.doctorDeatils,
        this.doctorImageDetails,
      );
      this.noDoctorFound = false;
      console.log('mergeAllDoctor....', this.mergeAllDoctor);
    });
  }
  mergeAllDoctorData(doctorDetails: any[], doctorImageDetails: any[]): any[] {
    const imageMap = new Map<number, any>(
      doctorImageDetails.map((img) => [img.id, img]),
    );

    return doctorDetails.map((doctor) => {
      const image = imageMap.get(doctor.id) || {};

      return {
        ...doctor,
        ...image,
      };
    });
  }
  getDoctorImages(doctor: any): string {
    if (doctor?.imageBase64 && doctor?.contentType) {
      return `data:${doctor.contentType};base64,${doctor.imageBase64}`;
    }
    return '/photo.png';
  }
  selectedDoctorDetails(data: any, event: any) {
    console.log('Selected data....', data);
    let payload = {
      purpose: 'addDoctor',
      data: data,
    };
    if (event == 'doctorList') {
      const data = this.dialog.open(EditSpecialtyDoctorsComponent, {
        maxWidth: '99vw',
        width: '1200px',
        maxHeight: '99vh',
        data: payload,
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);
        this.getDoctor();
        this.getSpeciallites();
      });
    }
  }
  deleteDoctorDetails(data: any, event: any) {
    console.log('Selected data....', data, event);
    this.ServicePortalService.deleteDoctorByIdDetails(data?.id).subscribe(
      (res: any) => {
        console.log(res);
        this.deleteDoctorImageById(data?.id);
      },
    );
  }
  deleteDoctorImageById(id: any) {
    this.ServicePortalService.deleteDoctorByIdImage(id).subscribe(
      (res: any) => {
        console.log(res);
        this.getDoctor();
        this.getSpeciallites();
      },
    );
  }
  bookAppointment(value: any) {
    this.dialog.open(RequestAppointmentComponent, {
      minWidth: '55vw',
      height: '63vh',
      width: '90vw',
      data: value,
    });
  }
}
