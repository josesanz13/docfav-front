import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { FilterMovie } from '../interfaces/filter-movie';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_MOVIES;
  }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/games`);
  }

  getMoviesFilter(filters: FilterMovie): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/games?${(filters.gender != "" ? `category=${filters.gender}` : "")}${(filters.platform != "" ? `&platform=${filters.platform}` : "")}`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/game?id=${id}`);
  }
}
