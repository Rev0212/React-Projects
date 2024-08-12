
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import "./index.css"

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ExpensesPieChart = ({ transactions }) => {
  // Prepare data for the pie chart
  const expenseCategories = transactions
    .filter(transaction => transaction.type === 'EXPENSES')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  const data = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#E7E9ED',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expense Categories</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpensesPieChart;
