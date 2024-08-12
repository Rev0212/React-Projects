import "./index.css";

const MoneyDetails = ({ totalBalance, totalIncome, totalExpense }) => {
  return (
    <div className="moneyDetailsContainer">
      <div className="itemContainer">
        <img className="MoneyDetailImage" src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png" alt="balance" />
        <div className="textContainer">
          <p>Your Balance</p>
          <p>Rs: {totalBalance}</p>
        </div>
      </div>
      <div className="itemContainer">
        <img className="MoneyDetailImage" src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png" alt="income" />
        <div className="textContainer">
          <p>Your Income</p>
          <p>Rs: {totalIncome}</p>
        </div>
      </div>
      <div className="itemContainer">
        <img className="MoneyDetailImage" src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png" alt="expenses" />
        <div className="textContainer">
          <p>Your Expenses</p>
          <p>Rs: {totalExpense}</p>
        </div>
      </div>
    </div>
  );
};

export default MoneyDetails;
