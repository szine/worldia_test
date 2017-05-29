import { Action } from '@ngrx/store';
import { Trip } from '../models/trip';


export const ADD_TRIP =             '[Collection] Add trip';
export const ADD_TRIP_SUCCESS =     '[Collection] Add trip Success';
export const ADD_TRIP_FAIL =        '[Collection] Add trip Fail';
export const REMOVE_TRIP =          '[Collection] Remove trip';
export const REMOVE_TRIP_SUCCESS =  '[Collection] Remove trip Success';
export const REMOVE_TRIP_FAIL =     '[Collection] Remove trip Fail';
export const LOAD =                 '[Collection] Load';
export const LOAD_SUCCESS =         '[Collection] Load Success';
export const LOAD_FAIL =            '[Collection] Load Fail';


/**
 * Add trip to Collection Actions
 */
export class AddTripAction implements Action {
  readonly type = ADD_TRIP;

  constructor(public payload: Trip) { }
}

export class AddTripSuccessAction implements Action {
  readonly type = ADD_TRIP_SUCCESS;

  constructor(public payload: Trip) { }
}

export class AddTripFailAction implements Action {
  readonly type = ADD_TRIP_FAIL;

  constructor(public payload: Trip) { }
}


/**
 * Remove trip from Collection Actions
 */
export class RemoveTripAction implements Action {
  readonly type = REMOVE_TRIP;

  constructor(public payload: Trip) { }
}

export class RemoveTripSuccessAction implements Action {
  readonly type = REMOVE_TRIP_SUCCESS;

  constructor(public payload: Trip) { }
}

export class RemoveTripFailAction implements Action {
  readonly type = REMOVE_TRIP_FAIL;

  constructor(public payload: Trip) {}
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Trip[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddTripAction
  | AddTripSuccessAction
  | AddTripFailAction
  | RemoveTripAction
  | RemoveTripSuccessAction
  | RemoveTripFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
