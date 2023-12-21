import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
    {
        path: '',
        component: MoviesComponent
    },
    {
        path: 'movie/:id',
        component: MoviesComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
