import { Action } from '@ngrx/store';
import { Area } from '../models/area';


export const SEARCH =           '[area] Search';
export const SEARCH_COMPLETE =  '[area] Search Complete';
export const LOAD =             '[area] Load';
export const SELECT =           '[area] Select';
export const GET_ALL =          '[area] get all';
export const GET_ALL_COMPLETE = '[area] get all complete';
export const SELECT_AREA = '[area] select area';

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

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Area[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Area) { }
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
  constructor(public payload: Area[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  | GetAllAction
  | GetAllCompleteAction;
