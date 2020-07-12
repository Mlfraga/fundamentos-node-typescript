import { response } from 'express';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface NewTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function sum(transactions: Transaction[]): number {
      return transactions.reduce(
        (acumulator, transaction) => acumulator + transaction.value,
        0,
      );
    }

    const incomesArray = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const income = sum(incomesArray);

    const outcomesArray = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcome = sum(outcomesArray);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: NewTransaction): Transaction {
    const newTransacttion = new Transaction({ title, type, value });

    this.transactions.push(newTransacttion);

    return newTransacttion;
  }
}

export default TransactionsRepository;
