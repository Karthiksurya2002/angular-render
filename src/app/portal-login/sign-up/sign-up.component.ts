import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicePortalService } from '../../service-portal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpFormGroup: any;

  constructor(
    private ServicePortalService: ServicePortalService,
    private dialog: MatDialogRef<SignUpComponent>,
    private authService: AuthServiceService,
  ) {}
  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      fistName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNo: new FormControl(null, Validators.required),
      emailId: new FormControl(null),
      address: new FormControl(null),
      gender: new FormControl(null),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  getRegister(): void {
    let body = {
      firstName: this.getValue.fistName.value,
      lastName: this.getValue.lastName.value,
      mobileNo: this.getValue.phoneNo.value,
      emailId: this.getValue.emailId.value,
      address: this.getValue.address.value,
      password: this.getValue.password.value,
      userName: this.getValue.userName.value,
    };
    this.authService.getRegister(body).subscribe((res: any) => {
      console.log(res);
      this.close();
    });
  }
  get checkError() {
    return this.signUpFormGroup.controls;
  }
  get getValue() {
    return this.signUpFormGroup.controls;
  }
  formReset() {
    this.signUpFormGroup.reset();
    this.signUpFormGroup.markAsPristine();
    this.signUpFormGroup.markAsUntouched();
    this.signUpFormGroup.updateValueAndValidity();
  }
  close() {
    this.dialog.close();
  }
}
