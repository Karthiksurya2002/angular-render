import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    action: string = 'Close',
    duration: number = 2000,
    vertical: MatSnackBarVerticalPosition = 'top',
    horizontal: MatSnackBarHorizontalPosition = 'center'
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: vertical,
      horizontalPosition: horizontal,
      panelClass: ['custom-snackbar'],
    });
  }
  showError(
    message: string,
    action: string = 'Close',
    duration: number = 2000,
    vertical: MatSnackBarVerticalPosition = 'top',
    horizontal: MatSnackBarHorizontalPosition = 'center'
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: vertical,
      horizontalPosition: horizontal,
      panelClass: ['custom-snackbarerror'],
    });
  }

  success(message: string, status: any) {
    this.show(message, status, 3000, 'top', 'center');
  }

  error(message: string, status: any) {
    this.showError(message, status, 3000, 'top', 'center');
  }
}
