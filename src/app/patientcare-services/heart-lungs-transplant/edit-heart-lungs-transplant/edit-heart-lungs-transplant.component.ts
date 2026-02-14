import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../../service-portal.service';
import { SnackbarService } from '../../../common/snackbar/snackbar.service';
@Component({
  selector: 'app-edit-heart-lungs-transplant',
  standalone: false,
  templateUrl: './edit-heart-lungs-transplant.component.html',
  styleUrl: './edit-heart-lungs-transplant.component.css',
})
export class EditHeartLungsTransplantComponent {
  formEdit: any;
  visibleTitle: boolean = false;
  payload: any;
  program: boolean = false;
  formProgram: any;
  heart: any;
  formHeart: any;
  formLungs: any;
  lungs: any;
  constructor(
    private dialogRef: MatDialogRef<EditHeartLungsTransplantComponent>,
    private ServicePortalService: ServicePortalService,
    @Inject(MAT_DIALOG_DATA) private value: any,
    private snackbar: SnackbarService
  ) {}
  ngOnInit() {
    this.formEdit = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
    });
    this.formProgram = new FormGroup({
      programTitle: new FormControl(),
      subProgramTitle: new FormControl(),
      programExplanation: new FormControl(),
      updateWhatWeDo: new FormControl(),
      updateWhatWeDoExplanation: new FormControl(),
      howWeDo: new FormControl(),
      howWeDoExplanation: new FormControl(),
    });
    this.formHeart = new FormGroup({
      heartTitle: new FormControl(null),
      heartContent: new FormControl(null),
      heartContentExpln: new FormControl(null),
    });
    this.formLungs = new FormGroup({
      lungsTitle: new FormControl(null),
      lungsContent: new FormControl(null),
      lungsContentExpln: new FormControl(null),
    });

    this.visibleTitle = this.value == 'title' ? true : false;
    if (this.visibleTitle) {
      this.getHeartLungsData('title');
    }
    this.program = this.value == 'program' ? true : false;
    if (this.program) {
      this.getProgram('program');
    }

    this.heart = this.value == 'heart' ? true : false;
    if (this.heart) {
      this.getHeart('heart');
    }
    this.lungs = this.value == 'lungs' ? true : false;
    if (this.lungs) {
      this.getLungs('lungs');
    }
  }
  Update() {
    if (this.value === 'title') {
      this.UpdateInfo();
    } else if (this.value === 'program') {
      this.updateProgram();
    } else if (this.value === 'heart') {
      this.updateHeart();
    } else if (this.value === 'lungs') {
      this.updateLungs();
    }
  }
  UpdateInfo() {
    if (this.visibleTitle) {
      const textareaTitle = this.formEdit.controls.title.value;
      const textareaContent = this.formEdit.controls.content.value;
      const contentValue = textareaContent
        .split('\n')
        .map((v: string) => v.trim())
        .filter((v: string) => v !== '');

      console.log(textareaTitle, '\n', contentValue);
      this.payload = {
        title: textareaTitle,
        content: contentValue,
        usage: this.value,
      };
    }

    this.ServicePortalService.updateHeartLungsData(this.payload).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success(
          'Heart Lungs Transplant Content Stored Successfully',
          201
        );
        this.closeDialog();
      }
    );
  }
  updateProgram() {
    const programExplanation =
      this.formProgram.controls.programExplanation.value;
    const programExplanationValue = programExplanation
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');
    const updateWhatWeDoExplanation =
      this.formProgram.controls.updateWhatWeDoExplanation.value;
    const updateWhatWeDoExplanationValue = updateWhatWeDoExplanation
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');

    const howWeDoExplanation =
      this.formProgram.controls.howWeDoExplanation.value;
    const howWeDoExplanationValue = howWeDoExplanation
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');

    this.payload = {
      programTitle: this.formProgram.controls.programTitle.value,
      subProgramTitle: this.formProgram.controls.subProgramTitle.value,
      programExplanation: programExplanationValue,
      updateWhatWeDo: this.formProgram.controls.updateWhatWeDo.value,
      updateWhatWeDoExplanation: updateWhatWeDoExplanationValue,
      howWeDo: this.formProgram.controls.howWeDo.value,
      howWeDoExplanation: howWeDoExplanationValue,
      usage: this.value,
    };
    this.ServicePortalService.updateProgram(this.payload).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success(
          'Heart Lungs Transplant Program Information is Stored Successfully',
          201
        );
        this.closeDialog();
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }
  getHeartLungsData(usage: any) {
    this.ServicePortalService.getHeartLungsData(usage).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.formEdit.controls.title.setValue(res?.data?.title);
        const raw = res?.data?.content[0];
        const contentArray = raw
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formEdit.controls.content.setValue(contentArray.join('\n'));
      }
    });
  }
  getProgram(usage: any) {
    this.ServicePortalService.getHeartLungsData(usage).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.formProgram.controls.howWeDo.setValue(res?.data?.howWeDo);
        this.formProgram.controls.programTitle.setValue(
          res?.data?.programTitle
        );
        this.formProgram.controls.subProgramTitle.setValue(
          res?.data?.subProgramTitle
        );
        this.formProgram.controls.updateWhatWeDo.setValue(
          res?.data?.updateWhatWeDo
        );
        const howWeDoExplanation = res?.data?.howWeDoExplanation[0];
        const howWeDoExplanationValue = howWeDoExplanation
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formProgram.controls.howWeDoExplanation.setValue(
          howWeDoExplanationValue.join('\n')
        );

        const programExplanation = res?.data?.programExplanation[0];
        const programExplanationValue = programExplanation
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formProgram.controls.programExplanation.setValue(
          programExplanationValue.join('\n')
        );

        const updateWhatWeDoExplanation =
          res?.data?.updateWhatWeDoExplanation[0];
        const updateWhatWeDoExplanationValue = updateWhatWeDoExplanation
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formProgram.controls.updateWhatWeDoExplanation.setValue(
          updateWhatWeDoExplanationValue.join('\n')
        );
      }
    });
  }
  getHeart(event: any) {
    this.ServicePortalService.getHeartLungsData(event).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.formHeart.controls.heartTitle.setValue(res?.data?.heartTitle);
        this.formHeart.controls.heartContent.setValue(res?.data?.heartContent);
        const heartContentExpln = res?.data?.heartContentExpln[0];
        const heartContentExplnValue = heartContentExpln
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formHeart.controls.heartContentExpln.setValue(
          heartContentExplnValue.join('\n')
        );
      }
    });
  }
  getLungs(event: any) {
    this.ServicePortalService.getHeartLungsData(event).subscribe((res: any) => {
      console.log(res);
      if (res?.data) {
        this.formLungs.controls.lungsTitle.setValue(res?.data?.lungsTitle);
        this.formLungs.controls.lungsContent.setValue(res?.data?.lungsContent);
        const lungsContentExpln = res?.data?.lungsContentExpln[0];
        const lungsContentExplnValue = lungsContentExpln
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((v: string) => v.trim());
        this.formLungs.controls.lungsContentExpln.setValue(
          lungsContentExplnValue.join('\n')
        );
      }
    });
  }
  updateHeart() {
    const heartExpln = this.formHeart.controls.heartContentExpln.value;
    const heartExplnValue = heartExpln
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');
    this.payload = {
      heartTitle: this.formHeart.controls.heartTitle.value,
      heartContent: this.formHeart.controls.heartContent.value,
      heartContentExpln: heartExplnValue,
    };
    this.ServicePortalService.updateHeart(this.payload).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success('Heart Information Saved Successfully', 201);
        this.closeDialog();
      }
    );
  }
  updateLungs() {
    const lungsExpln = this.formLungs.controls.lungsContentExpln.value;
    const lungsExplnValue = lungsExpln
      .split('\n')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '');
    this.payload = {
      lungsTitle: this.formLungs.controls.lungsTitle.value,
      lungsContent: this.formLungs.controls.lungsContent.value,
      lungsContentExpln: lungsExplnValue,
    };
    this.ServicePortalService.updateLungs(this.payload).subscribe(
      (res: any) => {
        console.log(res);
        this.snackbar.success('Lungs Information Saved Successfully', 201);
        this.closeDialog();
      }
    );
  }
}
