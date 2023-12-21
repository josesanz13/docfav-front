import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiMoviesService } from '../service/api-movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let mockMovieService: jasmine.SpyObj<ApiMoviesService>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('ApiMoviesService', ['getMovies', 'getMoviesFilter', 'getMovie']);
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiMoviesService, useValue: mockMovieService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: 1
              },
            },
          }
        },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [MoviesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movie details when calling getCard with "see"', () => {
    component.getCard(1, 'see');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie/1']);
  });

  it('should navigate to home when calling getCard with "return"', () => {
    component.getCard(1, 'return');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call getDataMovie when check_params is called with a valid id', () => {
    spyOn(component, 'getDataMovie');
    component.check_params(1);
    expect(component.getDataMovie).toHaveBeenCalledWith(1);
  });

  it('should call getAllMovies when check_params is called with an invalid id', () => {
    spyOn(component, 'getAllMovies');
    component.check_params(0);
    expect(component.getAllMovies).toHaveBeenCalled();
  });

  it('should call getMoviesFilter with correct parameters when getFilterMovie is called', () => {
    component.filtersMovie.gender = 'shooter';
    component.filtersMovie.platform = 'pc';

    mockMovieService.getMoviesFilter.and.returnValue(of([]));

    component.getFilterMovie();

    expect(mockMovieService.getMoviesFilter).toHaveBeenCalledWith(component.filtersMovie);
    expect(component.data).toEqual([]);
  });

  it('should set isEmptyFilters and filterError when getFilterMovie is called with empty filters', () => {
    component.filtersMovie.gender = '';
    component.filtersMovie.platform = '';

    component.getFilterMovie();

    expect(component.isEmptyFilters).toBe(true);
    expect(component.filterError).toBe('Please select at least one filter');
  });

  it('should call getMovies when getAllMovies is called', () => {
    mockMovieService.getMovies.and.returnValue(of([]));

    component.getAllMovies();

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(component.data).toEqual([]);
  });

  it('should update filtersMovie when onSelected is called with gender', () => {
    component.onSelected('shooter', 'gender');

    expect(component.filtersMovie.platform).toBe('');
    expect(component.filtersMovie.gender).toBe('shooter');
  });
});