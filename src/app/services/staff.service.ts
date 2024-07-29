import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../interfaces/staff';
import { Observable } from 'rxjs';
import { authInterceptor } from '../auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private staffUrl = 'http://localhost:8080/api/aop/staff';

  constructor(private http: HttpClient) {
    console.log('HttpClient instance:', http);
  }

  getStaffList(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.staffUrl}`);
  }
}
