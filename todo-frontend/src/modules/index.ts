import {
  combineReducers,
  configureStore,
  Dispatch,
  getDefaultMiddleware,
  Middleware,
  MiddlewareAPI,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { TODO, todoReducer } from './todo';

const rootReducer = combineReducers({
  [TODO]: todoReducer,
} as ReducersMapObject);

const persistMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  const returnValue = next(action);

  return returnValue;
};

export type IRootState = ReturnType<typeof rootReducer>;
export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), persistMiddleware],
});
