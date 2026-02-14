import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../service-portal.service';
import { SnackbarService } from '../../common/snackbar/snackbar.service';
@Component({
  selector: 'app-edid-hospital-best-logo',
  standalone: false,
  templateUrl: './edid-hospital-best-logo.component.html',
  styleUrl: './edid-hospital-best-logo.component.css',
})
export class EdidHospitalBestLogoComponent {
  selectedFile: any;
  selectedName: any;
  constructor(
    private ServicePortalService: ServicePortalService,
    private dialogRef: MatDialogRef<EdidHospitalBestLogoComponent>,
    private SnackbarService: SnackbarService
  ) {}
  filePath(event: any) {
    console.log(event);
    this.selectedFile = event;
    this.selectedName = event?.name;
  }
  save() {
    const formData = new FormData();
    formData.append('serviceName', this.selectedName);
    formData.append('image', this.selectedFile);
    this.ServicePortalService.saveCertificationLogo(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.SnackbarService.success(
          'Certification Logo Updated successfully',
          201
        );
        this.dialogRef.close(this.selectedFile);
      },
      (error: any) => {
        this.SnackbarService.error('Some thing went worng', 500);
      }
    );
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
