import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { Movie } from './models/movie.model';

export type IMDBApiMoviesResponse = Movie[];

interface LocalStorageMovies {
  edited: Movie[];
  deleted: string[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly url = 'https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-key': 'dcbf57cac6msh1c0b231f3e72396p168614jsnc15a14eac313',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com',
  });

  private cache$: Observable<IMDBApiMoviesResponse> | null = null;
  private readonly localKey = 'movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMDBApiMoviesResponse> {
    if (this.cache$) return this.cache$;

    this.cache$ = timer(300).pipe(
      switchMap(() => this.http.get<IMDBApiMoviesResponse>(this.url, { headers: this.headers })),
      map(apiMovies => this.mergeWithLocalChanges(apiMovies)),
      shareReplay(1)
    );

    return this.cache$;
  }

  private mergeWithLocalChanges(apiMovies: Movie[]): Movie[] {
    const local = this.getLocalData();

    // Filtrar películas eliminadas
    const filtered = apiMovies.filter(movie => !local.deleted.includes(movie.id));

    // Reemplazar películas editadas
    const editedMap = new Map(local.edited.map(m => [m.id, m]));
    return filtered.map(movie =>
      editedMap.has(movie.id) ? { ...movie, ...editedMap.get(movie.id)! } : movie
    );
  }

  updateMovie(updatedMovie: Movie): void {
    const local = this.getLocalData();
    const index = local.edited.findIndex(m => m.id === updatedMovie.id);

    if (index >= 0) {
      local.edited[index] = updatedMovie;
    } else {
      local.edited.push(updatedMovie);
    }

    this.saveLocalData(local);
    this.clearCache();
  }

  deleteMovie(id: string): void {
    const local = this.getLocalData();

    if (!local.deleted.includes(id)) {
      local.deleted.push(id);
      // También eliminar de editados si existe
      local.edited = local.edited.filter(m => m.id !== id);
    }

    this.saveLocalData(local);
    this.clearCache();
  }

  private getLocalData(): LocalStorageMovies {
    const raw = localStorage.getItem(this.localKey);
    return raw ? JSON.parse(raw) : { edited: [], deleted: [] };
  }

  private saveLocalData(data: LocalStorageMovies): void {
    localStorage.setItem(this.localKey, JSON.stringify(data));
  }

  clearCache(): void {
    this.cache$ = null;
  }
}
