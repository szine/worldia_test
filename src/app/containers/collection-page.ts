import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { Trip } from '../models/trip';


@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Mes favoris</md-card-title>
    </md-card>

    <bc-trip-preview-list [trips]="trips$ | async"></bc-trip-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class CollectionPageComponent {
  trips$: Observable<Trip[]>;

  constructor(store: Store<fromRoot.State>) {
    this.trips$ = store.select(fromRoot.getTripCollection);
  }
}
