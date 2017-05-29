import { Component, Input } from '@angular/core';

import { Trip } from '../models/trip';


@Component({
  selector: 'bc-trip-locations',
  template: `
    <h5 md-subheader>Locations :</h5>
    <span>
      {{ areas | bcAddCommas }}
    </span>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class TripLocationsComponent {
  @Input() trip: Trip;

  get areas() {
    return this.trip.locations.map(location => location.name);
  }
}
