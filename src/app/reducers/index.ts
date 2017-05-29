import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gittrips.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromSearch from './search';
import * as fromAreas from './areas';
import * as fromTrips from './trips';
import * as fromCollection from './collection';
import * as fromLayout from './layout';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  search: fromSearch.State;
  trips: fromTrips.State;
  areas: fromAreas.State;
  collection: fromCollection.State;
  layout: fromLayout.State;
  router: fromRouter.RouterState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  search: fromSearch.reducer,
  trips: fromTrips.reducer,
  areas: fromAreas.reducer,
  collection: fromCollection.reducer,
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `trips` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.tripsState$ = state$.select(gettripsState);
 * 	}
 * }
 * ```
 */
export const getTripsState = (state: State) => state.trips;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
 export const getTripEntities = createSelector(getTripsState, fromTrips.getEntities);
 export const getTripIds = createSelector(getTripsState, fromTrips.getIds);
 export const getSelectedtripId = createSelector(getTripsState, fromTrips.getSelectedId);
 export const getSelectedtrip = createSelector(getTripsState, fromTrips.getSelected);


/**
 * Just like with the trips selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = (state: State) => state.search;

export const getSearchtripIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);




/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of trips in the store.
 */
export const getSearchResults = createSelector(getTripEntities, getSearchtripIds, (trips, searchIds) => {
  return searchIds.map(id => trips[id]);
});

export const getTripsResults = createSelector(getTripEntities, getTripIds, (trips, tripsIds) => {
  return tripsIds.map(id => trips[id]);
});

export const getAreasState = (state: State) => state.areas;

export const getAreaEntities = createSelector(getAreasState, fromAreas.getEntities);
export const getAreaIds = createSelector(getAreasState, fromAreas.getIds);
export const getSelectedArea = createSelector(getAreasState, fromAreas.getSelected);

export const getSelectedAreaId = createSelector(getAreasState, fromAreas.getSelectedId);

export const getAreasResults = createSelector(getAreaEntities, getAreaIds, (areas, areasIds) => {
  return areasIds.map(id => areas[id]);
});

export const getTripsByArea = createSelector(getSelectedAreaId, getSelectedArea, getTripsResults, getAreasResults, (id_area, selected_area, trips, areas) => { 

  if(id_area == null || id_area == 'all') {
    let tripsByAreas: any[] = [];
    for(let area of areas) {
      if(area.id != null) {
        if(trips.filter(trip => trip.areas.find(trip_area => trip_area.id == area.id)) != null) {
          tripsByAreas.push({ 
            area: area,
            trips: trips.filter(trip => trip.areas.find(trip_area => trip_area.id == area.id))
          });
        }
      }
    }
    return tripsByAreas;
  } else {
    console.log('return only one');
    return [{ 
      area : selected_area,
      trips: trips.filter(trip => trip.areas.find(trip_area => trip_area.id == selected_area.id))
    }]
  }
}); 

export const getCollectionState = (state: State) => state.collection;

export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
export const getCollectiontripIds = createSelector(getCollectionState, fromCollection.getIds);

export const getTripCollection = createSelector(getTripEntities, getCollectiontripIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const isSelectedtripInCollection = createSelector(getCollectiontripIds, getSelectedtripId, (ids, selected) => {
  console.log(ids);
  console.log(selected);
  console.log(ids.find(id => id == selected) != null) ;
  return (ids.find(id => id == selected) != null) ;
});

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;

export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
