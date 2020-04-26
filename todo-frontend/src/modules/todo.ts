import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../lib/api/todo';

const name = 'Todo';
export function sortWithBoolean(
  prev: boolean,
  next: boolean,
  reverse: boolean = false,
): number {
  if (reverse) {
    return Number(next) - Number(prev);
  }
  return Number(prev) - Number(next);
}

export type IItemIdentity = Pick<Todo, 'id'>;

export interface ITodo {
  items: Todo[];
  currentFilter: Filter;
}

export enum Filter {
  ALL = '전체',
  DONE = '완료',
}

export interface IAddPayload {
  contents: string;
  createdTime: number;
}

export interface IDeletePayload extends IItemIdentity {}

export interface ITogglePayload extends IItemIdentity {}
const initialState: ITodo = {
  items: [],
  currentFilter: Filter.ALL,
};

const _ = createSlice({
  name,
  initialState,
  reducers: {
    add(state: ITodo, { payload }: PayloadAction<Todo[]>) {
      state.items = Array.from(new Set(payload));
    },
    changeFilter(state: ITodo, { payload }: PayloadAction<{ filter: Filter }>) {
      state.currentFilter = payload.filter;
    },
  },
});

const getFilter = (state: ITodo) => state.currentFilter;
const getItems = (state: ITodo) => state.items;
const getVisibleItems = createSelector(
  [getFilter, getItems],
  (filter, items) => {
    switch (filter) {
      case Filter.ALL:
        return items
          .slice()
          .sort((prev, next) =>
            sortWithBoolean(prev.isCompleted, next.isCompleted),
          );
      case Filter.DONE:
        return items.filter(item => item.isCompleted);
      default:
        throw Error(`Not found filter: ${filter}`);
    }
  },
);

export const todoSelectors = {
  filter: getFilter,
  items: getItems,
  visibleItems: getVisibleItems,
};

export const TODO = _.name;
export const todoActions = _.actions;
export const todoReducer = _.reducer;
