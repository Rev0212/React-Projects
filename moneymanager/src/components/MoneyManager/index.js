import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./index.css";
import MoneyDetails from '../MoneyDetails';
import TransactionItem from '../TransactionItem';
import ExpensesPieChart from '../ExpensePieChart';

const transactionTypeOptions = [
  { optionId: 'INCOME', displayText: 'Income' },
  { optionId: 'EXPENSES', displayText: 'Expenses' },
];

const expenseCategoryOptions = [
  'Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment',
];

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: '',
    categoryInput: '',
    transactions: [],
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    error: '',
  };

  componentDidMount() {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedTotalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    const savedTotalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0;
    const savedTotalBalance = savedTotalIncome - savedTotalExpense;

    this.setState({
      transactions: savedTransactions,
      totalIncome: savedTotalIncome,
      totalExpense: savedTotalExpense,
      totalBalance: savedTotalBalance,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.transactions !== this.state.transactions ||
        prevState.totalIncome !== this.state.totalIncome ||
        prevState.totalExpense !== this.state.totalExpense) {
      localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
      localStorage.setItem('totalIncome', this.state.totalIncome.toString());
      localStorage.setItem('totalExpense', this.state.totalExpense.toString());
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { titleInput, amountInput, typeInput, categoryInput, transactions, totalIncome, totalExpense } = this.state;

    if (!titleInput || !amountInput || !typeInput || (typeInput === 'EXPENSES' && !categoryInput)) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    if (isNaN(amountInput) || parseFloat(amountInput) <= 0) {
      this.setState({ error: 'Amount must be a positive number' });
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseFloat(amountInput),
      type: typeInput,
      category: typeInput === 'EXPENSES' ? categoryInput : '',
    };

    const updatedTransactions = [...transactions, newTransaction];
    let updatedTotalIncome = totalIncome;
    let updatedTotalExpense = totalExpense;

    if (typeInput === 'INCOME') {
      updatedTotalIncome += newTransaction.amount;
    } else {
      updatedTotalExpense += newTransaction.amount;
    }

    const updatedTotalBalance = updatedTotalIncome - updatedTotalExpense;

    this.setState({
      transactions: updatedTransactions,
      titleInput: '',
      amountInput: '',
      typeInput: '',
      categoryInput: '',
      totalIncome: updatedTotalIncome,
      totalExpense: updatedTotalExpense,
      totalBalance: updatedTotalBalance,
      error: '',
    });
  };

  handleDelete = (transactionId) => {
    const { transactions, totalIncome, totalExpense } = this.state;
    const transactionToDelete = transactions.find(transaction => transaction.id === transactionId);

    const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
    let updatedTotalIncome = totalIncome;
    let updatedTotalExpense = totalExpense;

    if (transactionToDelete.type === 'INCOME') {
      updatedTotalIncome -= transactionToDelete.amount;
    } else {
      updatedTotalExpense -= transactionToDelete.amount;
    }

    const updatedTotalBalance = updatedTotalIncome - updatedTotalExpense;

    this.setState({
      transactions: updatedTransactions,
      totalIncome: updatedTotalIncome,
      totalExpense: updatedTotalExpense,
      totalBalance: updatedTotalBalance,
    });
  };

  render() {
    const { titleInput, amountInput, typeInput, categoryInput, transactions, totalBalance, totalIncome, totalExpense, error } = this.state;

    return (
      <div className='appBg'>
        <div className='header'>
          <h1>Hi, Revanth</h1>
          <p>Welcome back to Money Manager</p>
        </div>
        <MoneyDetails totalBalance={totalBalance} totalIncome={totalIncome} totalExpense={totalExpense} />
        <div className='transactionAndHistory'>
          <div className='transactionContainer'>
            <p>Add Transactions</p>
            <form className='formContainer' id="transactionForm" onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="titleInput"
                type="text"
                value={titleInput}
                onChange={this.onChange}
                required
              />

              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                name="amountInput"
                type="number"
                value={amountInput}
                onChange={this.onChange}
                required
              />

              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="typeInput"
                value={typeInput}
                onChange={this.onChange}
                required
              >
                <option value="" disabled>Select type</option>
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>{option.displayText}</option>
                ))}
              </select>

              {typeInput === 'EXPENSES' && (
                <>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="categoryInput"
                    value={categoryInput}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {expenseCategoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </>
              )}

              <button type="submit">Add</button>
              {error && <p className='error'>{error}</p>}
            </form>
          </div>
          <div className='historyContainer'>
            <h1>History</h1>
            <div className='transactionItem'>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p>Category</p>
            </div>
            <div>
              {transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} onDelete={this.handleDelete} />
              ))}
            </div>
          </div>
        </div>
        <div className='pieConatiner'>
          <ExpensesPieChart transactions={transactions} />
        </div>
      </div>
    );
  }
}

export default MoneyManager;
