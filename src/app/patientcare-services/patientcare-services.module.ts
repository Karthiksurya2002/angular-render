import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientcareServicesRoutingModule } from './patientcare-services-routing.module';
import { HeartLungsTransplantComponent } from './heart-lungs-transplant/heart-lungs-transplant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditHeartLungsTransplantComponent } from './heart-lungs-transplant/edit-heart-lungs-transplant/edit-heart-lungs-transplant.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { RequestAppointmentComponent } from './book-appointment/request-appointment/request-appointment.component';
import { EditSpecialtyDoctorsComponent } from './book-appointment/edit-specialty-doctors/edit-specialty-doctors.component';
import { LikeShareComponent } from '../common/like-share/like-share.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentFormComponent } from './book-appointment/request-appointment/appointment-form/appointment-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MyRequestListComponent } from './book-appointment/my-request-list/my-request-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ViewDetailsComponent } from './book-appointment/my-request-list/view-details/view-details.component';
import { CancelAppointmentComponent } from './book-appointment/my-request-list/cancel-appointment/cancel-appointment.component';
import { CancelApprovedAppointmentComponent } from './book-appointment/my-request-list/cancel-approved-appointment/cancel-approved-appointment.component';
import { HistoryComponent } from './book-appointment/my-request-list/history/history.component';
import { CompleteConsultationComponent } from './book-appointment/my-request-list/complete-consultation/complete-consultation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewCompletedstatusComponent } from './book-appointment/my-request-list/history/view-completedstatus/view-completedstatus.component';
import { AmbulanceServicesComponent } from './ambulance-services/ambulance-services.component';
@NgModule({
  declarations: [
    HeartLungsTransplantComponent,
    EditHeartLungsTransplantComponent,
    BookAppointmentComponent,
    RequestAppointmentComponent,
    EditSpecialtyDoctorsComponent,
    AppointmentFormComponent,
    MyRequestListComponent,
    ViewDetailsComponent,
    CancelAppointmentComponent,
    CancelApprovedAppointmentComponent,
    HistoryComponent,
    CompleteConsultationComponent,
    ViewCompletedstatusComponent,
    AmbulanceServicesComponent,
  ],
  imports: [
    CommonModule,
    PatientcareServicesRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class PatientcareServicesModule {}
