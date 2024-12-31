import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Calculator] Add',
  props<{ num1: number; num2: number }>()
);

export const subtract = createAction(
  '[Calculator] Subtract',
  props<{ num1: number; num2: number }>()
);

export const multiply = createAction(
  '[Calculator] Multiply',
  props<{ num1: number; num2: number }>()
);

export const divide = createAction(
  '[Calculator] Divide',
  props<{ num1: number; num2: number }>()
);

export const setResult = createAction(
  '[Calculator] Set Result',
  props<{ result: number }>()
); 