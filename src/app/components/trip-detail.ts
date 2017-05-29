import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../models/trip';


@Component({
  selector: 'bc-trip-detail',
  template: `
    <md-card *ngIf="trip">
      <md-card-title-group>
        <md-card-title>{{ title }}</md-card-title>
        <md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
        <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </md-card-title-group>
      <md-card-content>
        <p [innerHtml]="description"></p>
      </md-card-content>
      <md-card-footer class="footer">
        <bc-trip-locations [trip]="trip"></bc-trip-locations>
      </md-card-footer>
      <md-card-actions align="start">
        <button md-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(trip)">
        Retirer des favoris
        </button>

        <button md-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(trip)">
        Ajouter a mes favoris
        </button>
      </md-card-actions>
    </md-card>

  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    md-card {
      max-width: 600px;
    }
    md-card-title-group {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin: 15px 0 50px;
    }
    md-card-actions {
      margin: 25px 0 0 !important;
    }
    md-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `]
})
export class TripDetailComponent {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() trip: Trip;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Trip>();
  @Output() remove = new EventEmitter<Trip>();


  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.trip.id;
  }

  get title() {
    return this.trip.name;
  }

  get subtitle() {
    return this.trip.catchPhrase;
  }

  get description() {
    //return this.trip.description;
    return "Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor";
  }

  get thumbnail(): string | boolean {
    if (this.trip.thumbnail) {
      return 'https://cdn.worldia.com/cache/270x300/' + this.trip.thumbnail.path;
    }
    return false;
  }
}
