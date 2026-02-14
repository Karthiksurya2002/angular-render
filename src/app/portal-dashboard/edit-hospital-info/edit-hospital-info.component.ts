import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../service-portal.service';
import { SnackbarService } from '../../common/snackbar/snackbar.service';
@Component({
  selector: 'app-edit-hospital-info',
  standalone: false,
  templateUrl: './edit-hospital-info.component.html',
  styleUrl: './edit-hospital-info.component.css',
})
export class EditHospitalInfoComponent {
  hospitalInfo: any;
  title: any;
  description: any;
  buttonName: any;
  constructor(
    private dialogRef: MatDialogRef<EditHospitalInfoComponent>,
    private ServicePortalService: ServicePortalService,
    private snackbar: SnackbarService
  ) {}
  ngOnInit() {
    this.hospitalInfo = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      buttonName: new FormControl(),
    });
    this.getDashboardData();
  }
  saveInfo() {
    let body = {
      title: this.hospitalInfo.controls.title.value,
      description: this.hospitalInfo.controls.description.value,
      buttonName: this.hospitalInfo.controls.buttonName.value,
    };
    this.ServicePortalService.addDashboardInformation(body).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success(res?.message, res?.status);
        this.dialogRef.close(res);
      }
    ),
      (error: any) => {
        console.error('Error occurred:', error);
        this.snackbar.error(error?.message, error?.status);
      };
  }
  getDashboardData() {
    this.ServicePortalService.getDashboardInformation().subscribe(
      (res: any) => {
        console.log(res);
        this.hospitalInfo.controls.title.setValue(res[0]?.title);
        this.hospitalInfo.controls.description.setValue(res[0]?.description);
        this.hospitalInfo.controls.buttonName.setValue(res[0]?.buttonName);
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
