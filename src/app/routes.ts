import { Routes } from '@angular/router';

import { TripExistsGuard } from './guards/trip-exists';
import { HomePageComponent } from './containers/home/home-page';
import { FindTripPageComponent } from './containers/find-trip-page';
import { ViewTripPageComponent } from './containers/view-trip-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'collection',
    component: CollectionPageComponent
  },
  {
    path: 'trips',
    component: FindTripPageComponent
  },
  {
    path: 'trip/:id',
    canActivate: [ TripExistsGuard ],
    component: ViewTripPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
