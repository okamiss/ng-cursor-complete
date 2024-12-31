import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import * as CalculatorActions from '../../store/calculator/calculator.actions';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card class="calculator-card">
      <mat-card-header>
        <mat-card-title>计算器</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="calculator-form">
          <mat-form-field appearance="outline">
            <mat-label>数字1</mat-label>
            <input matInput type="number" [(ngModel)]="num1">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>数字2</mat-label>
            <input matInput type="number" [(ngModel)]="num2">
          </mat-form-field>

          <div class="result">
            结果: {{ result$ | async }}
          </div>

          <div class="button-row">
            <button mat-raised-button color="primary" (click)="add()">加法</button>
            <button mat-raised-button color="accent" (click)="subtract()">减法</button>
            <button mat-raised-button color="warn" (click)="multiply()">乘法</button>
            <button mat-raised-button (click)="divide()">除法</button>
          </div>

          <div class="history">
            <h3>计算历史</h3>
            <div *ngFor="let item of history$ | async">
              {{ item }}
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .calculator-card {
      max-width: 600px;
      margin: 20px auto;
    }
    .calculator-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .button-row {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    .result {
      font-size: 24px;
      text-align: center;
      margin: 16px 0;
    }
    .history {
      margin-top: 20px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class CalculatorComponent {
  num1: number = 0;
  num2: number = 0;
  result$ = this.store.select(state => state.calculator.result);
  history$ = this.store.select(state => state.calculator.history);

  constructor(private store: Store<any>) {}

  add() {
    this.store.dispatch(CalculatorActions.add({ num1: this.num1, num2: this.num2 }));
  }

  subtract() {
    this.store.dispatch(CalculatorActions.subtract({ num1: this.num1, num2: this.num2 }));
  }

  multiply() {
    this.store.dispatch(CalculatorActions.multiply({ num1: this.num1, num2: this.num2 }));
  }

  divide() {
    if (this.num2 !== 0) {
      this.store.dispatch(CalculatorActions.divide({ num1: this.num1, num2: this.num2 }));
    } else {
      alert('除数不能为0');
    }
  }
} 