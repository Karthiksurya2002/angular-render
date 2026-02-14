import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // url: String = 'http://localhost:8080/shmp';
  url: string = 'https://hospital-backend-pkv3.onrender.com/shmp';
  constructor(private http: HttpClient) {}

  getLogin(body: any) {
    return this.http.post(`${this.url}` + '/login', body);
  }
  getRegister(body: any) {
    return this.http.post(`${this.url}` + '/register', body);
  }
  checkLoginUser(body: any) {
    return this.http.post(`${this.url}` + '/checkrole', body);
  }
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  saveUserRole(role: string) {
    localStorage.setItem('role', role);
  }
  saveUserId(id: string) {
    localStorage.setItem('userId', JSON.stringify(id));
  }
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    console.log('User logged out successfully.');
  }
}
