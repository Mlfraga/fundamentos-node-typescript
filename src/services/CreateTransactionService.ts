import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < value) {
        throw Error('error');
      }
    }

    const newTransaction: Request = {
      title,
      value,
      type,
    };

    const transaction = this.transactionsRepository.create(newTransaction);

    return transaction;
  }
}

export default CreateTransactionService;
