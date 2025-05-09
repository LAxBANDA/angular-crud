import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movie } from '../models/movie.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatDialogClose, FormsModule,MatButtonModule],
  styleUrls: ['./edit-movie-dialog.component.css']
})
export class EditMovieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
