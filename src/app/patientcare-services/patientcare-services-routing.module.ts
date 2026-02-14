import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeartLungsTransplantComponent } from './heart-lungs-transplant/heart-lungs-transplant.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { MyRequestListComponent } from './book-appointment/my-request-list/my-request-list.component';
import { AmbulanceServicesComponent } from './ambulance-services/ambulance-services.component';
const routes: Routes = [
  { path: 'heart-lungs-transplant', component: HeartLungsTransplantComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'my-request-list', component: MyRequestListComponent },
  { path: 'ambulance-services', component: AmbulanceServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientcareServicesRoutingModule {}
