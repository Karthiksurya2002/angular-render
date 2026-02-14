import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicePortalService } from '../../../../../service-portal.service';

@Component({
  selector: 'app-view-completedstatus',
  standalone: false,
  templateUrl: './view-completedstatus.component.html',
  styleUrl: './view-completedstatus.component.css',
})
export class ViewCompletedstatusComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServicePortalService,
  ) {}
  ngOnInit() {
    this.getOpNumberDetails(this.data);
  }
  getOpNumberDetails(id: any) {
    this.service.getOpNumberDetails(id).subscribe((res: any) => {
      console.log(res);
      this.data = res?.data;
    });
  }
}
