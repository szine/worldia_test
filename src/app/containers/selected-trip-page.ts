import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as collection from '../actions/collection';
import { Trip } from '../models/trip';


@Component({
  selector: 'bc-selected-trip-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-trip-detail
      [trip]="trip$ | async"
      [inCollection]="isSelectedtripInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-trip-detail>
  `
})
export class SelectedTripPageComponent {
  trip$: Observable<Trip>;
  isSelectedtripInCollection$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.trip$ = store.select(fromRoot.getSelectedtrip);
    this.isSelectedtripInCollection$ = store.select(fromRoot.isSelectedtripInCollection);
  }

  addToCollection(trip: Trip) {
    this.store.dispatch(new collection.AddTripAction(trip));
    this.router.navigate(['/trips']);
  }

  removeFromCollection(trip: Trip) {
    this.store.dispatch(new collection.RemoveTripAction(trip));
  }
}
