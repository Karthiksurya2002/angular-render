import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../../service-portal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../common/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-specialty-doctors',
  standalone: false,
  templateUrl: './edit-specialty-doctors.component.html',
  styleUrl: './edit-specialty-doctors.component.css',
})
export class EditSpecialtyDoctorsComponent {
  findDoctor: any;
  editSpecialties: any;
  doctorList: any;
  fileName = '';
  addDoctor: any = false;
  specialtiesCategoryDropDown: any;
  addDoctorForm: any;
  visibleButton: boolean = false;
  selectedDoctor: any;
  selectedName: any;
  selectedFile: any;
  editDoctor: any;
  updateDoctorImage: any;
  updateByDoctorId: any;
  imageChanged: any = false;
  showPassword: boolean = false;
  confirmShowPassword: boolean = false;
  selectedShift: any = 'Morning';
  shiftDetails: any = ['Morning', 'Evening', 'Night'];
  updateDoctor: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditSpecialtyDoctorsComponent>,
    private ServicePortalService: ServicePortalService,
    private snackbar: SnackbarService,
  ) {}
  ngOnInit() {
    this.editSpecialties = new FormGroup({
      BaTitle: new FormControl(null),
      BaSpecialties: new FormControl(null),
      BaSpecialtiesCategory: new FormControl(null),
      BaOrLabel: new FormControl(null),
      BaSearchLabel: new FormControl(null),
    });
    // this.addDoctorForm = new FormGroup({
    //   specialties: new FormControl(null, Validators.required),
    //   doctorName: new FormControl(null, Validators.required),
    //   designation: new FormControl(null, Validators.required),
    //   experience: new FormControl(null, Validators.required),
    // });
    this.addDoctorForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, Validators.required),
      doctorName: new FormControl(null, Validators.required),
      specialties: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      address: new FormControl(null, Validators.required),
      status: new FormControl('ACTIVE', Validators.required),
      shift: new FormControl(),
    });

    this.editDoctor = new FormGroup({
      updateSpecialties: new FormControl(null),
      updateDoctorName: new FormControl(null),
      updateDesignation: new FormControl(null),
      updateExperience: new FormControl(null),
    });
    this.findDoctor = this.data == 'doctorOption' ? true : false;

    this.doctorList = this.data?.purpose == 'doctorList' ? true : false;
    if (this.findDoctor || this.doctorList) {
      this.visibleButton = true;
    }
    if (this.doctorList) {
      this.upadateDoctorDetails();
    }
    this.addDoctor = this.data == 'addDoctor' ? true : false;
    if (this.data?.purpose == 'addDoctor') {
      this.addDoctor = true;
      this.updateDoctor = true;
      this.upadateDoctorDetails();
    }
    this.getSpeciallites();
  }
  Update() {
    if (!this.doctorList) {
      const BaSpecialtiesCategory =
        this.editSpecialties.controls.BaSpecialtiesCategory.value;
      const BaSpecialtiesCategoryValue = BaSpecialtiesCategory.split('\n')
        .map((v: string) => v.trim())
        .filter((v: string) => v !== '');
      let body = {
        baTitle: this.editSpecialties.controls.BaTitle.value,
        baSpecialties: this.editSpecialties.controls.BaSpecialties.value,
        baSpecialtiesCategory: BaSpecialtiesCategoryValue,
        baOrLabel: this.editSpecialties.controls.BaOrLabel.value,
        baSearchLabel: this.editSpecialties.controls.BaSearchLabel.value,
      };
      this.ServicePortalService.updateSpecialties(body).subscribe(
        (res: any) => {
          console.log(res);
          this.snackbar.success('Successcfully Saved.', 201);
          this.closeDialog();
        },
      );
    } else if (this.doctorList) {
      let body = {
        adSpecialties: this.selectedDoctor,
        adDoctorName: this.editDoctor.controls.updateDoctorName.value,
        adDesignation: this.editDoctor.controls.updateDesignation.value,
        adExperience: this.editDoctor.controls.updateExperience.value,
        id: this.updateByDoctorId,
      };
      this.ServicePortalService.updateDoctorById(body).subscribe((res: any) => {
        console.log(res);
        this.updateNewDoctorImage();
        this.closeDialog();
      });
    }
  }

  updateNewDoctorImage() {
    if (this.fileName) {
      this.imageChanged = true;
    }
    const formData = new FormData();
    formData.append('serviceName', this.selectedName);
    formData.append('image', this.selectedFile);
    formData.append('usage', 'doctorImage');
    formData.append('doctorImageId', this.updateByDoctorId);
    formData.append('imageChanged', this.imageChanged);
    this.ServicePortalService.updateDoctorImage(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success('Specialties Added Successfully.', 201);
        this.dialogRef.close();
      },
    );
  }
  getSpeciallites() {
    this.ServicePortalService.getSpecialties().subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.editSpecialties.controls.BaTitle.setValue(res?.data?.baTitle);
        this.editSpecialties.controls.BaSpecialties.setValue(
          res?.data?.baSpecialties,
        );
        this.editSpecialties.controls.BaOrLabel.setValue(res?.data?.baOrLabel);
        this.editSpecialties.controls.BaSearchLabel.setValue(
          res?.data?.baSearchLabel,
        );
        const raw = res?.data?.baSpecialtiesCategory[0];
        const baSpecialtiesCategory = raw
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.specialtiesCategoryDropDown = baSpecialtiesCategory;
        this.editSpecialties.controls.BaSpecialtiesCategory.setValue(
          baSpecialtiesCategory.join('\n'),
        );
      }
    });
  }

  onFileSelect(event: any) {
    const file: File | any = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.selectedName = file?.name;
      this.fileName = file.name;
    }
  }
  onSelect(event: any) {
    console.log((event.target as HTMLSelectElement).value);
    this.selectedDoctor = (event.target as HTMLSelectElement).value;
  }
  clearAttachement() {
    this.fileName = '';
  }
  closeDialog() {
    this.dialogRef.close();
  }
  checkValdation() {
    if (!this.updateDoctor) return this.addDoctorForm.invalid;
  }
  // addNewDoctor() {
  //   let body = {
  //     adSpecialties: this.selectedDoctor,
  //     adDoctorName: this.addDoctorForm.controls.doctorName.value,
  //     adDesignation: this.addDoctorForm.controls.designation.value,
  //     adExperience: this.addDoctorForm.controls.experience.value,
  //   };
  //   this.ServicePortalService.addDoctor(body).subscribe((res: any) => {
  //     console.log(res);
  //     this.addDoctorImage(res?.data);
  //   });
  // }
  addNewDoctor() {
    if (this.addDoctorForm.invalid) {
      this.addDoctorForm.markAllAsTouched();
      return;
    }

    let body = {
      id: this.updateByDoctorId != null ? this.updateByDoctorId : 0,
      adUsername: this.addDoctorForm.controls.username.value,
      adPassword: this.addDoctorForm.controls.password.value,
      adConfirmPassword: this.addDoctorForm.controls.confirmPassword.value,
      adDoctorName: this.addDoctorForm.controls.doctorName.value,
      adSpecialties: this.addDoctorForm.controls.specialties.value,
      adDepartment: this.addDoctorForm.controls.department.value,
      adDesignation: this.addDoctorForm.controls.designation.value,
      adQualification: this.addDoctorForm.controls.qualification.value,
      adExperience: Number(this.addDoctorForm.controls.experience.value),
      adMobile: this.addDoctorForm.controls.mobile.value,
      adAddress: this.addDoctorForm.controls.address.value,
      adStatus: this.addDoctorForm.controls.status.value,
      loginDetails: 'DoctorLoginDetails',
      adShift: this.selectedShift,
    };

    this.ServicePortalService.addDoctor(body).subscribe((res: any) => {
      console.log(res);
      this.addDoctorImage(res?.data);
    });
  }
  addDoctorImage(id: any) {
    const formData = new FormData();
    formData.append('serviceName', this.selectedName);
    formData.append('image', this.selectedFile);
    formData.append('usage', 'doctorImage');
    formData.append('doctorImageId', id);
    this.ServicePortalService.saveDoctorImage(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success('Specialties Added Successfully.', 201);
        this.dialogRef.close();
      },
    );
  }
  upadateDoctorDetails() {
    const id = this.data?.data?.id;
    this.ServicePortalService.getDoctorById(id).subscribe((res: any) => {
      console.log(res);
      this.updateByDoctorId = res?.data?.id;
      this.getImageByDoctorId(res?.data?.id);
      this.addDoctorForm.setValue({
        username: res?.data?.adUsername,
        password: res?.data?.adPassword,
        confirmPassword: res?.data?.adConfirmPassword,
        doctorName: res?.data?.adDoctorName,
        specialties: res?.data?.adSpecialties,
        department: res?.data?.adDepartment,
        designation: res?.data?.adDesignation,
        qualification: res?.data?.adQualification,
        experience: res?.data?.adExperience,
        mobile: res?.data?.adMobile,
        address: res?.data?.adAddress,
        status: res?.data?.adStatus,
        shift: res?.data?.adShift,
      });
    });
  }
  getImageByDoctorId(id: any) {
    this.ServicePortalService.getDoctorAllImage(id).subscribe((res: any) => {
      console.log(res);
      this.updateDoctorImage = `data:${res[0]?.contentType};base64,${res[0]?.imageBase64}`;
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  confirmPassword() {
    this.confirmShowPassword = !this.confirmShowPassword;
  }
  onSelectShiftDetails(event: any) {
    console.log(event);
    this.selectedShift = (event.target as HTMLSelectElement).value;
  }
}
