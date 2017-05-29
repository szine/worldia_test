import { createSelector } from 'reselect';
import { Trip } from '../models/trip';
import { Area } from '../models/area';
import * as trip from '../actions/trip';
import * as collection from '../actions/collection';


export interface State {
  ids: string[];
  entities: { [id: string]: Trip };
  selectedTripId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedTripId: null,
};

export function reducer(state = initialState, action: trip.Actions | collection.Actions): State {
  switch (action.type) {
    case trip.GET_ALL_COMPLETE: {
      console.log(action.payload);
       const trips = action.payload;
       const newTrips = trips.filter(trip => !state.entities[trip.id]);


        const newTripIds = newTrips.map(trip => trip.id);

        const newTripEntities = newTrips.reduce((entities: { [id: string]: Trip }, trip: Trip) => {
          return Object.assign(entities, {
            [trip.id]: trip
          });
        }, {});

        return {
          ids: [ ...state.ids, ...newTripIds ],
          entities: Object.assign({}, state.entities, newTripEntities),
          selectedTripId: state.selectedTripId
        };
    }
    case trip.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const trips = action.payload;
      const newTrips = trips.filter(trip => !state.entities[trip.id]);

      const newTripIds = newTrips.map(trip => trip.id);
      const newTripEntities = newTrips.reduce((entities: { [id: string]: Trip }, trip: Trip) => {
        return Object.assign(entities, {
          [trip.id]: trip
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newTripIds ],
        entities: Object.assign({}, state.entities, newTripEntities),
        selectedTripId: state.selectedTripId
      };
    }

    case trip.LOAD: {
      const trip = action.payload;

      if (state.ids.indexOf(trip.id) > -1) {
        return state;
      }

      return {
        ids: [ ...state.ids, trip.id ],
        entities: Object.assign({}, state.entities, {
          [trip.id]: trip
        }),
        selectedTripId: state.selectedTripId
      };
    }

    case trip.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedTripId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;


export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedTripId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
