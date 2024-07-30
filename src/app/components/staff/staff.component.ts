import { CreateStaffFormComponent } from './create-staff-form';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../interfaces/staff';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

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
    RouterModule,
    MatPaginatorModule,
    MatInputModule,
    MatPaginator,
    MatSortModule,
    // HttpClientModule,
  ],
  providers: [AuthService, StaffService],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<Staff>();
  // view child paginator and sort

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private staffService: StaffService,
    public dialog: MatDialog // private router: Router
  ) {}

  ngOnInit(): void {
    this.getStaffList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStaffList(): void {
    this.staffService.getStaffList().subscribe(
      (data: Staff[]) => {
        this.dataSource.data = data;
        console.log('Staff list fetch successfully');
      },
      (error) => {
        console.error('Error fetching staff list: ', error);
        /* console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error headers:', error.headers);

        if (error.status === 403) {
          console.error('Access forbidden. Check token validity or permission');
        } */
      }
    );
  }

  // dialog for create staff form
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

  // Open dialog to view staff by id
  openView(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    staffId: string
  ): void {
    this.staffService.getViewStaff(staffId).subscribe({
      next: (staff: Staff) => {
        this.dialog.open(ViewStaffComponent, {
          width: '80%',
          enterAnimationDuration,
          exitAnimationDuration,
          data: staff,
        });
      },
      error: (err) => {
        console.error('Error fetching staff details', err);
      },
    });
  }

  // filter logic

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
