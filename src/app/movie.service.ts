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

  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMDBApiMoviesResponse> {
    if (this.cache$) {
      return this.cache$;
    }

    this.cache$ = timer(300)
      .pipe(
        switchMap(() =>
          this.http.get(this.url, { headers: this.headers })
        ),
        tap(() => console.log('API call triggered')),
        shareReplay(1)
      );

    return this.cache$;
  }

  clearCache() {
    this.cache$ = null;
  }
}
