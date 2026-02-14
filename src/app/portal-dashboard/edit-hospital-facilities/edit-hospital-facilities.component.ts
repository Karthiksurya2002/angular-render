import { Component } from '@angular/core';
import { ServicePortalService } from '../../service-portal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../common/snackbar/snackbar.service';
@Component({
  selector: 'app-edit-hospital-facilities',
  standalone: false,
  templateUrl: './edit-hospital-facilities.component.html',
  styleUrl: './edit-hospital-facilities.component.css',
})
export class EditHospitalFacilitiesComponent {
  selectedFile: any;
  selectedName: any;
  facilitiesForm: any;
  facilities: any = [];
  buttonName: any;
  facilitiesDetails: any;
  constructor(
    private ServicePortalService: ServicePortalService,
    private dialogRef: MatDialogRef<EditHospitalFacilitiesComponent>,
    private snackbar: SnackbarService
  ) {}
  ngOnInit() {
    this.facilitiesForm = new FormGroup({
      facilitiesDetails: new FormControl(null),
      buttonName: new FormControl(null),
      titleFacilities: new FormControl(null),
      updateHospitalFacilities: new FormControl(null),
    });
    this.getFacilitiesDeatils();
  }
  filePath(event: any) {
    console.log(event);
    this.selectedFile = event;
    this.selectedName = event?.name;
  }
  saveImage() {
    const formData = new FormData();
    formData.append('serviceName', this.selectedName);
    formData.append('image', this.selectedFile);
    this.ServicePortalService.saveImageFacilities(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.dialogRef.close(this.selectedFile);
      },
      (error: any) => {
        this.snackbar.error('Some thing went worng.', 500);
      }
    );
  }
  getFacilitiesDeatils() {
    this.ServicePortalService.getFacilitiesDeatils().subscribe((res: any) => {
      if (res?.data) {
        this.buttonName = res.data.buttonFacilitiesName;
        this.facilitiesForm.controls.buttonName.setValue(this.buttonName);
        this.facilitiesForm.controls.titleFacilities.setValue(
          res.data?.titleFacilities
        );
        const raw = res.data.facilitiesDetails[0];

        const facilitiesArray = raw
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());

        this.facilitiesForm.controls.updateHospitalFacilities.setValue(
          facilitiesArray.join('\n')
        );
      }
    });
  }

  saveInfo() {
    const textareaValue = this.facilitiesForm.value.updateHospitalFacilities;

    const facilitiesArray = textareaValue
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');

    const body = {
      facilitiesDetails: facilitiesArray,
      buttonName: this.facilitiesForm.controls.buttonName.value,
      titleFacilities: this.facilitiesForm.controls.titleFacilities.value,
    };

    this.ServicePortalService.saveFacilitiesDeatils(body).subscribe(
      (res: any) => {
        this.snackbar.success('Facilities Deatils Saved successfully', 201);
        console.log('Saved successfully');
        this.closeDialog();
      },
      (error: any) => {}
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
{
  ('Ambulance Services,Pharmacy,Laboratory Services,Blood Bank,Insurance,Peripheral Centre');
}
