import { CreateStaffFormComponent } from './create-staff-form';
import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../interfaces/staff';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { opendir } from 'fs';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    // HttpClientModule,
  ],
  providers: [AuthService, StaffService],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  dataSource = new MatTableDataSource<Staff>();

  /*  terminals = ['KLIA', 'KLIA2', 'PENANG', 'FCZ'];
  statuses = ['ACTIVE', 'INACTIVE', 'LOCKED'];
  roles = ['ADMIN', 'USER']; */

  displayedColumns: string[] = ['id', 'fullName', 'email', 'role'];

  constructor(
    private authService: AuthService,
    private staffService: StaffService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList(): void {
    this.staffService.getStaffList().subscribe(
      (data: Staff[]) => {
        this.dataSource.data = data;
        console.log('Staff list fetch successfully');
      },
      (error) => {
        console.error('Error fetching staff list: ', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error headers:', error.headers);

        if (error.status === 403) {
          console.error('Access forbidden. Check token validity or permission');
        }
      }
    );
  }

  // toggle dialog

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(CreateStaffFormComponent, {
      width: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getStaffList(); // Refresh the list after successful addition
      }
    });
  }
}
