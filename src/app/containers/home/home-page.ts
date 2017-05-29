import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as trip from '../../actions/trip';
import * as area from '../../actions/area';

import { Trip } from '../../models/trip';
import { Area } from '../../models/area';


import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { Router } from '@angular/router';



@Component({
  selector: 'bc-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:'home-page.html',
  styleUrls: ['home-page.css']
})
export class HomePageComponent {
  searchQuery$: Observable<string>;
  trips$: Observable<Trip[]>;
  areas$: Observable<Area[]>;
  selectedArea: string | null = null;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.trips$ = store.select(fromRoot.getTripsResults);
    this.areas$ = store.select(fromRoot.getAreasResults);
    this.loading$ = store.select(fromRoot.getSearchLoading);
    this.store.dispatch(new trip.GetAllAction());
    this.store.dispatch(new area.GetAllAction());
    this.selectedArea = "all";
  }

  goToArea(id_area: string) {
    this.store.dispatch(new area.SelectAction(id_area));
    this.router.navigate(['/trips']);
  }

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    speed: 1000,
    autoHeight: true,
    autoplay: 5000,
    effect: 'fade',
    slidesPerView: 1,
    preventClicks: true,
    loop: true
    }
}
