import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { trip } from '../models/trip';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';

describe('CollectionEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CollectionEffects,
      {
        provide: Database,
        useValue: jasmine.createSpyObj('database', ['open', 'query', 'insert', 'executeWrite'])
      }
    ]
  }));

  function setup() {
    return {
      db: TestBed.get(Database),
      runner: TestBed.get(EffectsRunner),
      collectionEffects: TestBed.get(CollectionEffects)
    };
  }

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      const {db, collectionEffects} = setup();
      collectionEffects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('trips_app');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccessAction, with the trips, on success', () => {
      const trip1 = {id: '111', volumeInfo: {}} as trip;
      const trip2 = {id: '222', volumeInfo: {}} as trip;

      const {db, runner, collectionEffects} = setup();

      const tripsObservable = Observable.of(trip1, trip2);
      db.query.and.returnValue(tripsObservable);

      const expectedResult = new collection.LoadSuccessAction([trip1, trip2]);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('should return a collection.LoadFailAction, if the query throws', () => {
      const {db, runner, collectionEffects} = setup();

      const error = new Error('msg');
      db.query.and.returnValue(Observable.throw(error));

      const expectedResult = new collection.LoadFailAction(error);

      runner.queue(new collection.LoadAction());

      collectionEffects.loadCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('addtripToCollection$', () => {
    it('should return a collection.AddtripSuccessAction, with the trip, on success', () => {
      const trip = {id: '111', volumeInfo: {}} as trip;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.of({}));

      const expectedResult = new collection.AddtripSuccessAction(trip);

      runner.queue(new collection.AddtripAction(trip));

      collectionEffects.addtripToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('trips', [trip]);
      });
    });

    it('should return a collection.AddtripFailAction, with the trip, when the db insert throws', () => {
      const trip = {id: '111', volumeInfo: {}} as trip;

      const {db, runner, collectionEffects} = setup();
      db.insert.and.returnValue(Observable.throw(new Error()));

      const expectedResult = new collection.AddtripFailAction(trip);

      runner.queue(new collection.AddtripAction(trip));

      collectionEffects.addtripToCollection$.subscribe(result => {
        expect(result).toEqual(expectedResult);
        expect(db.insert).toHaveBeenCalledWith('trips', [trip]);
      });
    });

    describe('removetripFromCollection$', () => {
      it('should return a collection.RemovetripSuccessAction, with the trip, on success', () => {
        const trip = {id: '111', volumeInfo: {}} as trip;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.of({}));

        const expectedResult = new collection.RemovetripSuccessAction(trip);

        runner.queue(new collection.RemovetripAction(trip));

        collectionEffects.removetripFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('trips', 'delete', ['111']);
        });
      });

      it('should return a collection.RemovetripFailAction, with the trip, when the db insert throws', () => {
        const trip = {id: '111', volumeInfo: {}} as trip;

        const {db, runner, collectionEffects} = setup();
        db.executeWrite.and.returnValue(Observable.throw(new Error()));

        const expectedResult = new collection.RemovetripFailAction(trip);

        runner.queue(new collection.RemovetripAction(trip));

        collectionEffects.removetripFromCollection$.subscribe(result => {
          expect(result).toEqual(expectedResult);
          expect(db.executeWrite).toHaveBeenCalledWith('trips', 'delete', ['111']);
        });
      });
    });
  });
});
