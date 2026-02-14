import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDashboardImageComponent } from '../../portal-dashboard/edit-dashboard-image/edit-dashboard-image.component';
import { ServicePortalService } from '../../service-portal.service';
import { EditHeartLungsTransplantComponent } from './edit-heart-lungs-transplant/edit-heart-lungs-transplant.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-heart-lungs-transplant',
  standalone: false,
  templateUrl: './heart-lungs-transplant.component.html',
  styleUrl: './heart-lungs-transplant.component.css',
})
export class HeartLungsTransplantComponent {
  imageUrl: any;
  heartLungsForm: any;
  contentData: any;
  title: any;
  howWeDo: any;
  programTitle: any;
  updateWhatWeDo: any;
  subProgramTitle: any;
  howWeDoExplanation: any;
  programExplanation: any;
  updateWhatWeDoExplanation: any;
  heartTitle: any;
  heartContent: any;
  heartContentExpln: any;
  lungsTitle: any;
  lungsContent: any;
  lungsContentExpln: any;
  editAccess = false;
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
    this.heartLungsForm = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
    });
    this.updateImage();
    this.getHeartLungsData('title');
    this.getProgram('program');
    this.getHeart('heart');
    this.getLungs('lungs');
  }

  editAdmin(event: any) {
    if (event === 'image') {
      const data = this.dialog.open(EditDashboardImageComponent, {
        width: '45vw',
        height: '45vh',
        data: 'heartlungstransplant',
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.updateImage();
        }
      });
    } else {
      const data = this.dialog.open(EditHeartLungsTransplantComponent, {
        maxWidth: '100vw',
        height: '100vh',
        data: event,
      });
      data.afterClosed().subscribe((res: any) => {
        console.log(res);
        this.getHeartLungsData('title');
        this.getProgram('program');
        this.getHeart('heart');
        this.getLungs('lungs');
      });
    }
  }
  updateImage() {
    this.ServicePortalService.getDashboardImage(
      'heartlungstransplant',
    ).subscribe((blob: Blob) => {
      this.imageUrl = URL.createObjectURL(blob);
    });
  }
  getHeartLungsData(usage: any) {
    this.ServicePortalService.getHeartLungsData(usage).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.title = res?.data?.title;
        const content = res?.data?.content[0];
        this.contentData = content?.split(',').map((res: any) => res.trim());

        // this.facilitiesForm.controls.updateHospitalFacilities.setValue(
        //   facilitiesArray.join('\n')
        // );
      }
    });
  }
  getProgram(usage: any) {
    this.ServicePortalService.getHeartLungsData(usage).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.howWeDo = res?.data?.howWeDo;
        this.programTitle = res?.data?.programTitle;
        this.subProgramTitle = res?.data?.subProgramTitle;
        this.updateWhatWeDo = res?.data?.updateWhatWeDo;
        const howWeDoExplanation = res?.data?.howWeDoExplanation[0];
        this.howWeDoExplanation = howWeDoExplanation
          ?.split(',')
          .map((res: any) => res.trim());
        const programExplanation = res?.data?.programExplanation[0];
        this.programExplanation = programExplanation
          ?.split(',')
          .map((res: any) => res.trim());
        const updateWhatWeDoExplanation =
          res?.data?.updateWhatWeDoExplanation[0];
        this.updateWhatWeDoExplanation = updateWhatWeDoExplanation
          ?.split(',')
          .map((res: any) => res.trim());
      }
    });
  }
  getHeart(event: any) {
    this.ServicePortalService.getHeartLungsData(event).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.heartTitle = res?.data?.heartTitle;
        this.heartContent = res?.data?.heartContent;
        const heartContentExpln = res?.data?.heartContentExpln[0];
        this.heartContentExpln = heartContentExpln
          ?.split(',')
          .map((res: any) => res.trim());
      }
    });
  }
  getLungs(event: any) {
    this.ServicePortalService.getHeartLungsData(event).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.lungsTitle = res?.data?.lungsTitle;
        this.lungsContent = res?.data?.lungsContent;
        const lungsContentExpln = res?.data?.lungsContentExpln[0];
        this.lungsContentExpln = lungsContentExpln
          ?.split(',')
          .map((res: any) => res.trim());
      }
    });
  }
}
