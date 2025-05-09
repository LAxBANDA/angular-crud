import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, tap, shareReplay } from 'rxjs/operators';
import { Movie } from './models/movie.model';

export type IMDBApiMoviesResponse = Movie[];

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly url = 'https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-key': 'dcbf57cac6msh1c0b231f3e72396p168614jsnc15a14eac313',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com',
  });

  private cache$: Observable<any> | null = null;

  constructor(private http: HttpClient) {}

  // Obtiene las películas de la API y las fusiona con las películas modificadas en localStorage
  getMovies(): Observable<IMDBApiMoviesResponse> {
    if (this.cache$) {
      return this.cache$;
    }

    this.cache$ = timer(300).pipe(
      switchMap(() =>
        this.http.get<IMDBApiMoviesResponse>(this.url, { headers: this.headers })
    ),
    tap((movies: IMDBApiMoviesResponse) => {
      // Obtenemos las películas modificadas de localStorage
      const modifiedMovies = this.getModifiedMovies();

      // Combinamos las películas de la API con las modificadas
      this.cacheMovies(movies, modifiedMovies);
    }),
    shareReplay(1)
  );

  return this.cache$;
}

// Guarda en localStorage las películas modificadas
cacheMovies(movies: IMDBApiMoviesResponse, modifiedMovies: IMDBApiMoviesResponse): void {
  const allMovies = [...movies, ...modifiedMovies];
  localStorage.setItem('movies', JSON.stringify(allMovies));
}

// Obtiene las películas modificadas de localStorage
getModifiedMovies(): IMDBApiMoviesResponse {
  const storedMovies = localStorage.getItem('movies');
  if (storedMovies) {
    return JSON.parse(storedMovies);
  }

  return [];
}

// Elimina una película modificada de localStorage
removeMovieFromStorage(index: number): void {
  const movies = this.getModifiedMovies();
  if (movies && movies.length > index) {
    movies.splice(index, 1);
    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Actualiza una película en localStorage
updateMovieInStorage(index: number, updatedMovie: Movie): void {
  const movies = this.getModifiedMovies();
  if (movies && movies.length > index) {
    movies[index] = updatedMovie;
    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Limpia el caché en el servicio
clearCache() {
  this.cache$ = null;
}
}
