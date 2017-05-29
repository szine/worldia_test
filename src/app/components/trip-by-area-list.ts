import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';

@Component({
  selector: 'bc-trip-by-area-list',
  template: `
    <div style="width:100%" *ngFor="let tripsByArea of tripsByAreas">
      <div class="area-list-item" [style.background-image]="'url(https://cdn.worldia.com/cache/bgimage_lg/' + tripsByArea.area.thumbnail.path +')'">
        <div class="opacity-block" style="">
              <div class="intro container">
                  <div class="inner-intro">
                      <h1 class="header-title">
                         {{tripsByArea.area.name}} : {{tripsByArea.area.catchPhrase}}
                      </h1>
                      <p class="header-sub-title">
                          {{tripsByArea.area.description}}
                      </p>
                  </div>
              </div>
          </div> 
      </div>
      <bc-trip-preview-list  [trips]="tripsByArea.trips"></bc-trip-preview-list>
    </div>  
    
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .area-list-item {
      background-size: cover;
      background-position: center center;
      color : white;
      height: 200px;
      text-align: center;
      
    }
    .container {
      padding-top: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }
    .opacity-block {
      width : 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
  `]
})
export class TripByAreaListComponent {
  @Input() tripsByAreas: any[];
}
