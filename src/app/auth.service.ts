import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Staff } from './interfaces/staff';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/authenticate';
  private createUrl = 'http://localhost:8080/api/auth/register';
  private logoutUrl = 'http://localhost:8080/api/auth/logout';

  constructor(private http: HttpClient) {}

  // register service

  register(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.createUrl}`, staff);
  }

  // login service

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      map((response) => {
        if (response && response.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {}, { responseType: 'text' }).pipe(
      map((response) => {
        sessionStorage.removeItem('currentUser');
        return response;
      })
    );
  }

  // get isLoggedIn(): boolean {
  //   return !!sessionStorage.getItem('currentUser');
  // }

  get isLoggedIn(): boolean {
    // Ensure we're in a browser environment before accessing sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!sessionStorage.getItem('currentUser');
    }
    return false;
  }
}
