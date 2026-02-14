import { Component } from '@angular/core';
import { ServicePortalService } from '../../service-portal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../common/snackbar/snackbar.service';
@Component({
  selector: 'app-edit-patient-care-services',
  standalone: false,
  templateUrl: './edit-patient-care-services.component.html',
  styleUrl: './edit-patient-care-services.component.css',
})
export class EditPatientCareServicesComponent {
  fieldName1 = '';
  fieldName2 = '';
  fieldName3 = '';
  fieldName4 = '';
  fieldName5 = '';

  // store uploaded files by number
  images: any = {};
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;

  constructor(
    private servicePortalService: ServicePortalService,
    private dialog: MatDialogRef<EditPatientCareServicesComponent>,
    private SnackbarService: SnackbarService
  ) {}
  ngOnInit() {
    this.getPatientCareImage();
  }
  // called from <app-file-upload>
  filePath(event: any, iconNo: any) {
    const file = event;
    if (file) {
      this.images[iconNo - 1] = file;
    }
  }

  update() {
    const formData = new FormData();

    // 🔹 append text values
    formData.append('fieldName1', this.fieldName1);
    formData.append('fieldName2', this.fieldName2);
    formData.append('fieldName3', this.fieldName3);
    formData.append('fieldName4', this.fieldName4);
    formData.append('fieldName5', this.fieldName5);

    // 🔹 append images
    Object.keys(this.images).forEach((iconNo) => {
      formData.append('images', this.images[iconNo]);
      formData.append('iconNos', iconNo);
    });

    this.servicePortalService.updatePatientCare(formData).subscribe({
      next: (res) => {
        this.SnackbarService.success(
          'PatientCare Image Updated successfully',
          201
        );
        console.log('Updated successfully', res);
        this.dialog.close(true);
      },
      error: (err) => {
        this.SnackbarService.error('Some thing went worng.', 500);
        console.error('Update failed', err);
      },
    });
  }
  getPatientCareImage() {
    this.servicePortalService.getPatientCareImage().subscribe((res: any) => {
      console.log(res);
      this.image1 = `data:image/jpeg;base64,${res[0]?.base64}`;
      this.image2 = `data:image/jpeg;base64,${res[1]?.base64}`;
      this.image3 = `data:image/jpeg;base64,${res[2]?.base64}`;
      this.image4 = `data:image/jpeg;base64,${res[3]?.base64}`;
      this.image5 = `data:image/jpeg;base64,${res[4]?.base64}`;
    });
  }
  closeDialog() {
    this.dialog.close(true);
  }
}
