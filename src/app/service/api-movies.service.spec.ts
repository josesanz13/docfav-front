import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiMoviesService } from './api-movies.service';
import { environment } from '../../environments/environment.development';
import { FilterMovie } from '../interfaces/filter-movie';

describe('ApiMoviesService', () => {
  let service: ApiMoviesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiMoviesService],
    });
    service = TestBed.inject(ApiMoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies', () => {
    const mockResponse = [{ id: 1, title: 'Movie 1' }];
    service.getMovies().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(`${environment.API_MOVIES}/games`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get filtered movies', () => {
    const filters: FilterMovie = { gender: 'shooter', platform: 'pc', name: "" };
    const mockResponse = [{ id: 1, title: 'Filtered Movie' }];
    service.getMoviesFilter(filters).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${environment.API_MOVIES}/games?category=${filters.gender}&platform=${filters.platform}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get a specific movie', () => {
    const movieId = 1;
    const mockResponse = { id: movieId, title: 'Specific Movie' };
    service.getMovie(movieId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(`${environment.API_MOVIES}/game?id=${movieId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});