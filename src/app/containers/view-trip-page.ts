import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as trip from '../actions/trip';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View trip Page's responsibility is to map router params
 * to a 'Select' trip action. Actually showing the selected
 * trip remains a responsibility of the
 * SelectedtripPageComponent
 */
@Component({
  selector: 'bc-view-trip-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-trip-page></bc-selected-trip-page>
  `
})
export class ViewTripPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new trip.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
