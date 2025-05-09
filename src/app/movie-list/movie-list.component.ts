import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [CommonModule,MovieDetailsComponent],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies = <Movie[]>[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data
      },
      error: (err) => console.error('Error cargando películas:', err)
    });
  }


  removeMovie(index: number): void {
    this.movies.splice(index, 1);
  }

  updateMovie(event: any): void {
    this.movies[event.index] = event.data;
  }
}
