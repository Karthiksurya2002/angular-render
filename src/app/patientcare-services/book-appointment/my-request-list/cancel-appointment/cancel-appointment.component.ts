import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../common/snackbar/snackbar.service';
import { ServicePortalService } from '../../../../service-portal.service';
import { AuthServiceService } from '../../../../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-cancel-appointment',
  standalone: false,
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.css',
})
export class CancelAppointmentComponent {
  role: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelAppointmentComponent>,
    private ServicePortalService: ServicePortalService,
    private snackbar: SnackbarService,
    private authService: AuthServiceService,
  ) {}
  ngOnInit(): void {
    this.role = this.authService?.getUserRole();
    console.log('Received data for cancellation:', this.data);
  }
  onCancel() {
    this.ServicePortalService.cancelAppointment(
      this.data?.opNumber,
      this.role,
    ).subscribe(
      (res: any) => {
        this.snackbar.success(res?.message, 200);
        this.dialogRef.close(true);
      },
      (error: any) => {
        this.snackbar.success(error?.message, 500);
      },
    );
  }
  onClose() {
    this.dialogRef.close();
  }
}
