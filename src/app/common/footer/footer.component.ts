import { Component } from '@angular/core';
import { AboutUsComponent } from '../about-us/about-us.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}
  email = 'supportsmarthospital@gmail.com';
  openEmail() {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}`,
      '_blank',
    );
  }
  openAbout() {
    this.dialog.open(AboutUsComponent, {
      maxWidth: '60vw',
    });
  }
}
