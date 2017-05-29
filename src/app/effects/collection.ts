import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Trip } from '../models/trip';


@Injectable()
export class CollectionEffects {

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('trips_app');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.db.query('trips')
        .toArray()
        .map((trips: Trip[]) => new collection.LoadSuccessAction(trips))
        .catch(error => of(new collection.LoadFailAction(error)))
    );

  @Effect()
  addTripToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_TRIP)
    .map((action: collection.AddTripAction) => action.payload)
    .mergeMap(trip =>
      this.db.insert('trips', [ trip ])
        .map(() => new collection.AddTripSuccessAction(trip))
        .catch(() => of(new collection.AddTripFailAction(trip)))
    );


  @Effect()
  removeTripFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_TRIP)
    .map((action: collection.RemoveTripAction) => action.payload)
    .mergeMap(trip =>
      this.db.executeWrite('trips', 'delete', [ trip.id ])
        .map(() => new collection.RemoveTripSuccessAction(trip))
        .catch(() => of(new collection.RemoveTripFailAction(trip)))
    );

    constructor(private actions$: Actions, private db: Database) { }
}
