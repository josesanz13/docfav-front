import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-movie',
  standalone: true,
  imports: [],
  templateUrl: './image-movie.component.html',
  styleUrl: './image-movie.component.css'
})
export class ImageMovieComponent {
  @Input() imageMovie: string = "";
  @Input() altImageMovie: string = "";
  @Input() genre: string = "";
}
