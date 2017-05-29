import * as collection from '../actions/collection';


export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collection.LOAD_SUCCESS: {
      const trips = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: trips.map(trip => trip.id)
      };
    }

    case collection.ADD_TRIP_SUCCESS:
    case collection.REMOVE_TRIP_FAIL: {
      const trip = action.payload;

      if (state.ids.indexOf(trip.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, trip.id ]
      });
    }

    case collection.REMOVE_TRIP_SUCCESS:
    case collection.ADD_TRIP_FAIL: {
      const trip = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== trip.id)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
