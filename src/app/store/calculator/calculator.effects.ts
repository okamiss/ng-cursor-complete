import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as CalculatorActions from './calculator.actions';

@Injectable()
export class CalculatorEffects {
  calculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CalculatorActions.add,
        CalculatorActions.subtract,
        CalculatorActions.multiply,
        CalculatorActions.divide
      ),
      map(action => {
        let result = 0;
        switch (action.type) {
          case '[Calculator] Add':
            result = action.num1 + action.num2;
            break;
          case '[Calculator] Subtract':
            result = action.num1 - action.num2;
            break;
          case '[Calculator] Multiply':
            result = action.num1 * action.num2;
            break;
          case '[Calculator] Divide':
            result = action.num1 / action.num2;
            break;
        }
        return CalculatorActions.setResult({ result });
      })
    )
  );

  constructor(private actions$: Actions) {}
} 