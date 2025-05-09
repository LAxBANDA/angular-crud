import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMovieDialogComponent } from '../edit-movie-dialog/edit-movie-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-details',
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  @Input() movie!: Movie;
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ index: number; data: Movie }>();

  constructor(private dialog: MatDialog) {}

  onEdit(): void {
    const dialogRef = this.dialog.open(EditMovieDialogComponent, {
      width: '400px',
      data: { ...this.movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit.emit({ index: this.index, data: result });
      }
    });
  }

  onDelete(): void {
    this.remove.emit(this.index);
  }
}
