import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyRequestListComponent } from '../../patientcare-services/book-appointment/my-request-list/my-request-list.component';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
import { interval, map } from 'rxjs';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicePortalService } from '../../service-portal.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  time$: any;
  doctors = 'doctors';
  appointment = 'appointment';
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private AuthServiceService: AuthServiceService,
    private service: ServicePortalService,
  ) {}
  ngOnInit(): void {
    this.time$ = interval(1000).pipe(
      map(() => new Date().toLocaleTimeString()),
    );
  }
  getAppointment() {
    // this.dialog.open(MyRequestListComponent, {
    //   width: '90vw',
    //   minWidth: '70vw',
    //   height: '80vh',
    // });
  }
  logout() {
    this.AuthServiceService.logout();
    this.router.navigate(['/login']);
  }
  openAbout() {
    this.dialog.open(AboutUsComponent, {
      maxWidth: '60vw',
    });
  }
  bookAppointment() {
    console.log('Reload');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/patientcare/book-appointment']);
      this.service.updateData('bookappointmentimage');
    });
  }
}
