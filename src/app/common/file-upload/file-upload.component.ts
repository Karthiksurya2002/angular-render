import { Component, EventEmitter, Output } from '@angular/core';
export interface PatientCareService {
  id: number;
  name: string;
  imageUrl?: string;
}
@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  @Output() messageEvent = new EventEmitter<string>();

  fileName = '';

  onFileSelect(event: any) {
    const file: File | any = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.messageEvent.emit(file);
    }
  }
  clearAttachement() {
    this.fileName = '';
  }
}
