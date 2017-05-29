import { createSelector } from 'reselect';
import { Area } from '../models/area';
import * as area from '../actions/area';
import * as collection from '../actions/collection';


export interface State {
  ids: string[];
  entities: { [id: string]: Area };
  selectedAreaId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedAreaId: null,
};

export function reducer(state = initialState, action: area.Actions | collection.Actions): State {
  switch (action.type) {
    case area.GET_ALL_COMPLETE: {
      console.log(action.payload);
       const areas = action.payload;
       const newAreas = areas.filter(area => !state.entities[area.id]);

        const newAreaIds = newAreas.map(area => area.id);

        const newAreaEntities = newAreas.reduce((entities: { [id: string]: Area }, area: Area) => {
          return Object.assign(entities, {
            [area.id]: area
          });
        }, {});

        return {
          ids: [ ...state.ids, ...newAreaIds ],
          entities: Object.assign({}, state.entities, newAreaEntities),
          selectedAreaId: state.selectedAreaId
        };
    }
    case area.SELECT: {
      console.log(action.payload);

        return {
          ids: state.ids,
          entities: state.entities,
          selectedAreaId: action.payload
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

export const getSelectedId = (state: State) => state.selectedAreaId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
