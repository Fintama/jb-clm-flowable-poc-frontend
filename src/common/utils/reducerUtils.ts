import { createReducer, Reducer } from 'typesafe-actions';

export type FnMap = {
  [key: string]: (state: any, action: any) => any;
};

export function createConditionalSliceReducer(sliceName: string, fnMap: FnMap): Reducer<any, any> {
  // Create a reducer that knows how to handle one slice of state, with these action types
  const sliceReducer = createReducer({}, fnMap);

  // Create a new wrapping reducer
  return (state: any, action: any) => {
    // Check to see if this slice reducer knows how to handle this action
    if (fnMap[action.type]) {
      // If it does, pass the slice to the slice reducer, and update the slice
      return {
        ...state,
        [sliceName]: sliceReducer(state[sliceName], action),
      };
    }

    // Otherwise, return the existing state unchanged
    return state;
  };
}
