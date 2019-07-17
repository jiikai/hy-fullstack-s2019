import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {

  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  test('should return a proper initial state when called with undefined state', () => {
    expect(counterReducer(undefined, {type: 'DO_NOTHING'}))
      .toEqual(initialState);
  });

  test('good is incremented', () => {
    const state = initialState;
    deepFreeze(state);
    expect(counterReducer(state, {type: 'GOOD'}))
      .toEqual({...state, good: 1});
  });
  test('ok is incremented', () => {
    const state = initialState;
    deepFreeze(state);
    expect(counterReducer(state, {type: 'OK'}))
      .toEqual({...state, ok: 1});
  });
  test('bad is incremented', () => {
    const state = initialState;
    deepFreeze(state);
    expect(counterReducer(state, {type: 'BAD'}))
      .toEqual({...state, bad: 1});
  });
  test('reseting to zero works', () => {
    const state = {...initialState, ok: 10};
    deepFreeze(state);
    expect(counterReducer(state, {type: 'ZERO'}))
      .toEqual({...initialState});
  });
});