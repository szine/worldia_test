import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';

@Component({
  selector: 'bc-trip-preview-list',
  template: `
    <bc-trip-preview *ngFor="let trip of trips" [trip]="trip"></bc-trip-preview>
    <div *ngIf="trips.length == 0">
      Il n'y a pas de voyage pour cette zone pour le moment, veuillez repasser plus tard.
    </div>
    
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class TripPreviewListComponent {
  @Input() trips: any[];
}
