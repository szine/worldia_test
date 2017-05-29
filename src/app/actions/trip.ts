import { Action } from '@ngrx/store';
import { Trip } from '../models/trip';

export const SEARCH =           '[trip] Search';
export const SEARCH_BY_AREA =   '[trip] Search by area';
export const SEARCH_COMPLETE =  '[trip] Search Complete';
export const LOAD =             '[trip] Load';
export const SELECT =           '[trip] Select';
export const GET_ALL =          '[trip] get all';
export const GET_ALL_COMPLETE =          '[trip] get all complete';



/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handtrip/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}
export class SearchByAreaAction implements Action {
  readonly type = SEARCH_BY_AREA;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Trip[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Trip) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}

export class GetAllAction implements Action {
  readonly type = GET_ALL;
  constructor() { }
}

export class GetAllCompleteAction implements Action {
  readonly type = GET_ALL_COMPLETE;
  constructor(public payload: Trip[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchByAreaAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  | GetAllAction
  | GetAllCompleteAction;
