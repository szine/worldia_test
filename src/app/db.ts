import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'trips_app',
  stores: {
    trips: {
      autoIncrement: true,
      primaryKey: 'id'
    },
    areas: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};
