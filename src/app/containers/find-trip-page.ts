import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as trip from '../actions/trip';
import * as area from '../actions/area';
import { Trip } from '../models/trip';
import { Area } from '../models/area';


@Component({
  selector: 'bc-find-trip-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-trip-search [areas]="areas$ | async" [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="searchByArea($event)"></bc-trip-search>
    <bc-trip-by-area-list [tripsByAreas]="tripsByAreas$ | async"></bc-trip-by-area-list>
  `
})
export class FindTripPageComponent {
  searchQuery$: Observable<string>;
  areas$: Observable<Area[]>;
  loading$: Observable<boolean>;
  tripsByAreas$: Observable<any[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchQuery$ = store.select(fromRoot.getSelectedAreaId);
    this.areas$ = store.select(fromRoot.getAreasResults);
    this.tripsByAreas$ = store.select(fromRoot.getTripsByArea);
    this.loading$ = store.select(fromRoot.getSearchLoading);
  }

  search(query: string) {
    this.store.dispatch(new trip.SearchAction(query)); 
  }

  searchByArea(id_area: string) {
    this.store.dispatch(new area.SelectAction(id_area));
  }
}
