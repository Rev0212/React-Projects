import "./index.css";

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, title, amount, type, category } = transaction;

  // Format amount without a minus sign
  const formattedAmount = `Rs: ${amount}`;

  return (
    <div className="transactionItem">
      <p>{title}</p>
      <p>{formattedAmount}</p>
      <p>{type}</p>
      <p>{type === 'EXPENSES' ? category : ''}</p> {/* Render category only if type is EXPENSES */}
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        alt="delete"
        onClick={() => onDelete(id)}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default TransactionItem;
