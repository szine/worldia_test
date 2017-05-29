import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TripLocationsComponent } from './trip-locations';
import { TripDetailComponent } from './trip-detail';
import { TripPreviewComponent } from './trip-preview';
import { TripPreviewListComponent } from './trip-preview-list';
import { TripByAreaListComponent } from './trip-by-area-list';
import { TripSearchComponent } from './trip-search';
import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item';
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';

import { PipesModule } from '../pipes';


export const COMPONENTS = [
  TripLocationsComponent,
  TripDetailComponent,
  TripPreviewComponent,
  TripPreviewListComponent,
  TripByAreaListComponent,
  TripSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
