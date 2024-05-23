import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  token = '';
  email = '';
  password = '';
  role = '';

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post('/login', { email, password }, { responseType: 'text' })
      .pipe(
        map((data) => {
          this.parseLogin(data);
          return data;
        })
      );
  }
  relogin(): Observable<any> {
    return this.login(this.email, this.password);
  }
  logout() {
    this.token = '';
    this.email = '';
    //this.service.cleareRole();
    localStorage.clear();
  }

  getRole() {
    this.parseLogin(localStorage.getItem('token')!);
    return this.role;
  }

  hasRole(role: string) {
    if (role === this.role) {
      return true;
    } else return false;
  }

  tokenControl() {
    let token = localStorage.getItem('token');
    let payload = this.parseJwt(token!);
    let tarih = payload.exp;
    let now = Date.now() / 1000;
    //console.log(parseInt(tarih!));
    if (parseInt(tarih!) > now) {
      return true;
    } else return false;
  }

  parseLogin(data: string) {
    let payload = this.parseJwt(data);
    this.role = payload.role;
    let email = payload.email;
    localStorage.setItem('token', data);
    // localStorage.setItem('role', this.role);
    //localStorage.setItem('email', email);
  }
  getEmail() {
    let payload = this.parseJwt(localStorage.getItem('token')!);
    return payload.email;
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .replace(/_/g, '');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
