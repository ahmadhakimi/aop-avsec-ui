import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company';
import { response } from 'express';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { error } from 'console';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [MatCardModule, MatTableModule, NgIf, MatSortModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [CompanyService],
})
export class CompanyComponent {
  dataSource: any[] = [];

  displayColumn: string[] = [
    'id',
    'companyName',
    'rocExpDate',
    'contact',
    'companyEmail',
    'companyStatus',
    'address',
    'createdBy',
    'updatedBy',
  ];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanyList();
  }

  // company list 

  getCompanyList(): void {
    this.companyService.getCompanyList().subscribe(
      (data) => {
        console.log('Received data:', data);
        this.dataSource = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // create company 
  
}
