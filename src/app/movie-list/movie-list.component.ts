import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '../models/movie.model';
import { EditMovieDialogComponent } from '../edit-movie-dialog/edit-movie-dialog.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [CommonModule,MovieDetailsComponent],
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  editMovie(movie: Movie): void {
    this.movieService.updateMovie(movie);
    // actualizar en memoria sin recargar la API
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
    }
  }

  deleteMovie(index: number): void {
    const movieId = this.movies[index].id
    this.movieService.deleteMovie(movieId);
    // eliminar en memoria sin recargar la API
    this.movies = this.movies.filter(m => m.id !== movieId);
  }
}
