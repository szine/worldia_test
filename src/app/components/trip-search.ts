import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-trip-search',
  template: `
    <md-card>
      <md-card-title>Rechercher par zone</md-card-title>
      <md-card-content>
        <md-select style="width:100%" (change)="search.emit($event.value)" placeholder="Selectionnez un itinéraire" name="area">
           <md-option [value]="'all'">Toutes les zones</md-option>
           <md-option *ngFor="let area of areas" [value]="area.id">{{ area.name }}</md-option>
        </md-select>
        <md-spinner [class.show]="searching"></md-spinner>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    md-card-title,
    md-card-content {
      display: flex;
      justify-content: center;
    }

    input {
      width: 300px;
    }

    md-card-spinner {
      padding-left: 60px; // Make room for the spinner
    }

    md-spinner {
      width: 30px;
      height: 30px;
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
    }

    md-spinner.show {
      opacity: 1.0;
    }
  `]
})
export class TripSearchComponent {
  @Input() query = '';
  @Input() areas: any[] = [];
  @Input() searching = false;
  @Output() search = new EventEmitter<string>();
}
