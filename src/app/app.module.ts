import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalLoginComponent } from './portal-login/portal-login.component';
import { SignUpComponent } from './portal-login/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';
import { MatRadioModule } from '@angular/material/radio';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ContentComponent } from './common/content/content.component';
import { MatSelectModule } from '@angular/material/select';
import { EditDashboardImageComponent } from './portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { EditPatientCareServicesComponent } from './portal-dashboard/edit-patient-care-services/edit-patient-care-services.component';
import { EditHospitalInfoComponent } from './portal-dashboard/edit-hospital-info/edit-hospital-info.component';
import { EdidHospitalBestLogoComponent } from './portal-dashboard/edid-hospital-best-logo/edid-hospital-best-logo.component';
import { EditHospitalFacilitiesComponent } from './portal-dashboard/edit-hospital-facilities/edit-hospital-facilities.component';
import { LikeShareComponent } from './common/like-share/like-share.component';
import { AboutUsComponent } from './common/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalLoginComponent,
    SignUpComponent,
    PortalDashboardComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    EditDashboardImageComponent,
    FileUploadComponent,
    EditPatientCareServicesComponent,
    EditHospitalInfoComponent,
    EdidHospitalBestLogoComponent,
    EditHospitalFacilitiesComponent,
    LikeShareComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  exports: [LikeShareComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
