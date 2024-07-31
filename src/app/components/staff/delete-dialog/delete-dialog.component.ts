import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { StaffService } from '../../../services/staff.service';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  constructor(
    private staffService: StaffService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; fullName: string }
  ) {}

  confirmDelete() {
    this.staffService.deleteStaff(this.data.id).subscribe({
      next: () => {
        console.log('The user has been deleted successfully ');
        this.dialogRef.close(true);
      },

      error: (err) => {
        console.error('Error deleting staff: ', err);
        this.dialogRef.close(false);
      },
    });
  }
}
