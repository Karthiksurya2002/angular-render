import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details',
  standalone: false,
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
})
export class ViewDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewDetailsComponent>,
  ) {}

  ngOnInit(): void {
    console.log('Received data:', this.data);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
