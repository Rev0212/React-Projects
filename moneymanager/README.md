# moneymanager


A simple money-tracking web application built with React. This app allows users to add, view, and manage their expenses, providing an overview of total expenses and a visual representation through a pie chart.

## Features

- Add new expenses with description and amount
- View a list of added expenses
- Display the total expenses
- Visualize expenses with a pie chart

## Getting Started

To get started with this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).
- cd money-tracker
-npm install
-npm install chart.js react-chartjs-2
-npm start
This will open the application in your default web browser. By default, it will be available at http://localhost:3000.


### Project Structure
src/components/: Contains the React components for the application.

ExpensePieChart.js: Component to display the pie chart of expenses.
MoneyDetails.js: Component to display details of the total expenses.
MoneyManager.js: Main component that integrates functionality for adding and managing expenses.
TransactionItem.js: Component to display individual transactions.
src/App.js: Main application component that integrates all other components.
src/styles.css: Basic styling for the application.


