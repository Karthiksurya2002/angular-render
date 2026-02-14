import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicePortalService } from '../service-portal.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../common/snackbar/snackbar.service';
import { AuthServiceService } from './auth-service/auth-service.service';
@Component({
  selector: 'app-portal-login',
  standalone: false,
  templateUrl: './portal-login.component.html',
  styleUrl: './portal-login.component.css',
})
export class PortalLoginComponent {
  loginFormGroup: any;
  info: any;
  constructor(
    private dialog: MatDialog,
    private ServicePortalService: ServicePortalService,
    private AuthServiceService: AuthServiceService,
    private route: Router,
    private snackbar: SnackbarService,
  ) {}
  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.getPublicInfo();
  }
  getSignUp(): void {
    this.dialog.open(SignUpComponent, {
      width: '700px',
      height: '500px',
    });
  }
  get hasError() {
    return this.loginFormGroup.controls;
  }
  get formValue() {
    return this.loginFormGroup.controls;
  }
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  // getLogin() {
  //   let body = {
  //     userName: this.formValue.userName.value,
  //     password: this.formValue.password.value,
  //   };
  //   this.ServicePortalService.getLogin(body).subscribe({
  //     next: (res: any) => {
  //       this.notification.success(res.message);
  //     },
  //     error: (err) => {
  //       this.notification.error(err.error.message || 'Login failed');
  //     },
  //   });
  // }
  getLogin() {
    let body = {
      userName: this.formValue.userName.value,
      password: this.formValue.password.value,
    };
    this.AuthServiceService.getLogin(body).subscribe(
      (res: any) => {
        console.log(res);
        this.AuthServiceService.saveUserId(res?.data);
        console.log('UserId....', res?.data);
        this.AuthServiceService.saveUser(body);

        (this.AuthServiceService.checkLoginUser(body).subscribe((res: any) => {
          console.log(res);
          const role = res?.data;
          this.AuthServiceService.saveUserRole(role);
          this.route.navigateByUrl('/dashboard');
          this.snackbar.success(`${role} Successfully Logged In`, res?.status);
        }),
          (error: any) => {
            this.snackbar.error(error?.error?.error, error?.error?.status);
          });
      },
      (error: any) => {
        this.snackbar.error(error?.error?.error, error?.error?.status);
      },
    );
  }

  getPublicInfo() {
    this.ServicePortalService.getPublicInfo().subscribe((res: any) => {
      console.log(res);
      this.info = res?.data[0];
    });
  }
}
// spring.application.name=SpringEcomCrud
// spring.datasource.url=jdbc:postgresql://localhost:5432/hospitalportal
// spring.datasource.username=postgres
// spring.datasource.password=2002

// spring.jpa.hibernate.ddl-auto=update
// spring.jpa.show-sql=true
// spring.datasource.hikari.auto-commit=false

// # MAX FILE SIZE
// spring.servlet.multipart.max-file-size=20MB
// spring.servlet.multipart.max-request-size=20MB

// # OPTIONAL (recommended)
// spring.servlet.multipart.enabled=true
