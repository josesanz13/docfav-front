import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageMovieComponent } from './image-movie.component';

describe('ImageMovieComponent', () => {
  let component: ImageMovieComponent;
  let fixture: ComponentFixture<ImageMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [ImageMovieComponent],
      imports: [ImageMovieComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageMovieComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image with correct src and alt attributes', () => {
    const testImageUrl = 'test-image-url';
    const testAltText = 'test-alt-text';

    component.imageMovie = testImageUrl;
    component.altImageMovie = testAltText;

    fixture.detectChanges();

    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(testImageUrl);
    expect(imgElement.alt).toBe(testAltText);
  });
});