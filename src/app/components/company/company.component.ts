import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company';
import { response } from 'express';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { error } from 'console';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    NgIf,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
  ],
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

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {}

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

  // open dialog to create company
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      width: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCompanyList(); // Refresh the list after successful addition
      }
    });
    4;
  }
}
