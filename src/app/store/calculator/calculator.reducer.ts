import { createReducer, on } from '@ngrx/store';
import * as CalculatorActions from './calculator.actions';
import { initialCalculatorState } from './calculator.state';

export const calculatorReducer = createReducer(
  initialCalculatorState,
  on(CalculatorActions.setResult, (state, { result }) => ({
    ...state,
    result,
    history: [...state.history, `Result: ${result}`]
  }))
); 