import { Component } from '@angular/core';
import { ApiMoviesService } from '../service/api-movies.service';
import { ApiMovies } from '../interfaces/api-movies';
import { ApiMovie } from '../interfaces/api-movie';
import { FilterMovie } from '../interfaces/filter-movie';
import { ImageMovieComponent } from '../image-movie/image-movie.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [ImageMovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  data: ApiMovies[] = [];
  filtersMovie: FilterMovie;
  dataMovie: ApiMovie;
  isFindId = false;
  params = 0;
  filterError = ""
  isEmptyFilters = false

  constructor(private movieService: ApiMoviesService, private route: ActivatedRoute, private router: Router) {
    this.dataMovie = <ApiMovie>{};
    this.filtersMovie = <FilterMovie>{
      gender: "",
      platform: ""
    };
  }

  ngOnInit(): void {
    this.params = this.route.snapshot.params.id;
    this.check_params(this.params)
  }

  getCard(id: number, type: string) {
    if (type == "see") {
      this.router.navigate([`/movie/${id}`]);
    }

    if (type == "return") {
      this.router.navigate([`/`]);
    }
  }

  check_params(id: number) {
    if (typeof id !== "undefined" && id != 0) {
      this.isFindId = true;
      this.getDataMovie(id)
    } else {
      this.getAllMovies()
    }
  }

  getFilterMovie() {
    if (this.filtersMovie.gender != "" || this.filtersMovie.platform != "") {
      this.movieService.getMoviesFilter(this.filtersMovie).subscribe(data => {
        this.data = data;
      });
    } else {
      this.isEmptyFilters = true;
      this.filterError = "Please select at least one filter"
    }
  }

  getAllMovies() {
    this.movieService.getMovies().subscribe(data => {
      this.data = data;
    });
  }

  onSelected(value: string, select: string) {
    switch (select) {
      case "platform":
        this.filtersMovie.platform = value
        break;
      default:
        this.filtersMovie.gender = value
        break;
    }
  }

  getDataMovie(id: number) {
    this.movieService.getMovie(id).subscribe(data => {
      this.dataMovie = data;
    });
  }
}
