import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalLoginComponent } from './portal-login/portal-login.component';
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';
import { ContentComponent } from './common/content/content.component';
import { BookAppointmentComponent } from './patientcare-services/book-appointment/book-appointment.component';
import { authenticationGuard } from './portal-login/auth/authentication.guard';
// const routes: Routes = [
//   {
//     path: 'login',
//     component: PortalLoginComponent,
//     data: { routeName: 'login' },
//   },
//   // {
//   //   path: 'dashboard',
//   //   component: PortalDashboardComponent,
//   // },
//   {
//     path: 'main',
//     component: ContentComponent,
//   },
//   {
//     path: 'book-appointment',
//     component: BookAppointmentComponent,
//   },
//   {
//     path: '',
//     component: ContentComponent,
//   },
// ];

const routes: Routes = [
  {
    path: 'login',
    component: PortalLoginComponent,
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: 'dashboard', component: PortalDashboardComponent },
      { path: 'book-appointment', component: BookAppointmentComponent },
      { path: 'appointment', component: BookAppointmentComponent },
      {
        path: 'patientcare',
        loadChildren: () =>
          import('./patientcare-services/patientcare-services.module').then(
            (m) => m.PatientcareServicesModule,
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
