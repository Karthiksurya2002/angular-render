import { Component } from '@angular/core';
import { EditDashboardImageComponent } from '../../portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicePortalService } from '../../service-portal.service';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-ambulance-services',
  standalone: false,
  templateUrl: './ambulance-services.component.html',
  styleUrl: './ambulance-services.component.css',
})
export class AmbulanceServicesComponent {
  imageUrl: any;
  editAccess: any;
  constructor(
    private dialog: MatDialog,
    private ServicePortalService: ServicePortalService,
    private AuthServiceService: AuthServiceService,
  ) {}
  ngOnInit() {
    const role = this.AuthServiceService.getUserRole();
    console.log('role.............', role);
    if (role === 'Admin') {
      this.editAccess = true;
    }
    this.updateDashBoardImage();
  }
  editAdmin(event: any) {
    console.log(event);
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: 'ambulance',
      });
      data.afterClosed().subscribe((res: any) => {
        if (res) {
          this.updateDashBoardImage();
        }
      });
    }
  }
  updateDashBoardImage() {
    this.ServicePortalService.getDashboardImage('ambulance').subscribe(
      (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob);
      },
    );
  }
}
