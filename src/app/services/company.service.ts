import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyUrl = 'http://localhost:8080/api/aop/company';

  constructor(private http: HttpClient) {}

  // get all company list

  getCompanyList(): Observable<Company[]> {
    console.log('calling GET company list API');
    return this.http.get<Company[]>(`${this.companyUrl}`);
  }

  // create company

  createCompany(company: FormData): Observable<any> {
    return this.http.post<any>(`${this.companyUrl}`, company);
  }
}
