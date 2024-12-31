export interface CalculatorState {
  result: number;
  history: string[];
}

export const initialCalculatorState: CalculatorState = {
  result: 0,
  history: []
}; 