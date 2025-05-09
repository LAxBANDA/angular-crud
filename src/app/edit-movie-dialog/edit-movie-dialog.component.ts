import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatDialogClose, FormsModule],
  styleUrls: ['./edit-movie-dialog.component.css']
})
export class EditMovieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
