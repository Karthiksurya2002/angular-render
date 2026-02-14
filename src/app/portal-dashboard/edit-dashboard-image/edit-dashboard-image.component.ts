import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ServicePortalService } from '../../service-portal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-dashboard-image',
  standalone: false,
  templateUrl: './edit-dashboard-image.component.html',
  styleUrl: './edit-dashboard-image.component.css',
})
export class EditDashboardImageComponent {
  selectedFile: any;
  selectedName: any;
  constructor(
    private ServicePortalService: ServicePortalService,
    private dialogRef: MatDialogRef<EditDashboardImageComponent>,
    @Inject(MAT_DIALOG_DATA) private usage: any
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
    formData.append('usage', this.usage);
    this.ServicePortalService.saveImage(formData).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close(this.selectedFile);
    });
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
