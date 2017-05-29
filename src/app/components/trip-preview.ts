import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';


@Component({
  selector: 'bc-trip-preview',
  template: `
    <a [routerLink]="['/trip', id]">
      <md-card [style.background-image]="'url(' + thumbnail +')'" style="padding: 0px">
      <div style="background: rgba(0,0,0,0.5);width:100%;height:100%;padding:24px;">
        <md-card-title-group>
          <md-card-title>{{ title | bcEllipsis:35 }}</md-card-title>
          <md-card-subtitle *ngIf="subtitle">{{ subtitle | bcEllipsis:40 }}</md-card-subtitle>
        </md-card-title-group>
        <md-card-content>
          <p *ngIf="catchPhrase">{{ catchPhrase | bcEllipsis }}</p>
        </md-card-content>
        <md-card-footer>
          <bc-trip-locations [trip]="trip"></bc-trip-locations>
        </md-card-footer>
        </div>
      </md-card>
    </a>
  `,
  styles: [`
    md-card {
      width: 270px;
      height: 300px;
      margin: 15px;
      color: white;
    }
    @media only screen and (max-width: 768px) {
      md-card {
        margin: 15px 0 !important;
      }
    }
    md-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    md-card-title {
      margin-right: 10px;
    }
    md-card-subtitle {
      color: white;
    }
    md-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding: 0 25px 25px;
    }
  `]
})
export class TripPreviewComponent {
  @Input() trip: Trip;

  get id() {
    return this.trip.id;
  }

  get title() {
    return this.trip.name;
  }

  get subtitle() {
    return this.trip.catchPhrase;
  }


  get thumbnail(): string | boolean {
    if (this.trip.thumbnail) {
      return 'https://cdn.worldia.com/cache/270x300/' + this.trip.thumbnail.path;
    }
    return false;
  }
}
