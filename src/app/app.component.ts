import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SmartHospitalManagementPortal';
  hideHeader: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const name = this.route.snapshot.data['routeName'];
    console.log(name);
    console.log(this.router.url);
    if (this.router.url == '/') {
      this.hideHeader = true;
    }
    this.route.data.subscribe((data) => {
      console.log('Current Route Name:', data['routeName']);
    });
  }
}
