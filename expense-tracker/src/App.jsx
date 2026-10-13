import { useState } from 'react';
import './App.css';

function App() {
  // State to hold the list of expenses
  const [expenses, setExpenses] = useState([]);

  // State variables for form inputs
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  // State to show validation error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle adding a new expense
  const handleAddExpense = (e) => {
    e.preventDefault(); // Prevents default page reload on form submit

    // Validation: name cannot be empty
    if (!name.trim()) {
      setErrorMessage('Please enter an expense name.');
      return;
    }

    // Validation: amount must be a number greater than zero
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter an amount greater than 0.');
      return;
    }

    // Create a new expense item with unique ID
    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: parsedAmount,
      category: category,
    };

    // Add new expense to the existing list
    setExpenses([...expenses, newExpense]);

    // Reset input fields and clear any previous error
    setName('');
    setAmount('');
    setCategory('Food');
    setErrorMessage('');
  };

  // Function to delete an expense by its ID using filter()
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  // Calculate total expense using JavaScript reduce() method
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <h1>Personal Expense Tracker</h1>
        <p className="subtitle">Track and analyze your daily expenses.</p>
      </header>

      {/* Expense Summary Section */}
      <section className="summary-container">
        <div className="summary-card">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value">₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Number of Expenses</span>
          <span className="summary-value">{expenses.length}</span>
        </div>
      </section>

      {/* Add Expense Form Section */}
      <section className="card form-card">
        <h2>Add Expense</h2>

        {errorMessage && (
          <div className="error-banner">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAddExpense} className="expense-form">
          <div className="form-group">
            <label htmlFor="expenseName">Expense Name</label>
            <input
              id="expenseName"
              type="text"
              placeholder="e.g., Grocery, Bus Ticket"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expenseAmount">Amount (₹)</label>
            <input
              id="expenseAmount"
              type="number"
              placeholder="e.g., 250"
              min="0.01"
              step="any"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expenseCategory">Category</label>
            <select
              id="expenseCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-blue">
            Add Expense
          </button>
        </form>
      </section>

      {/* Expense List Table Section */}
      <section className="card list-card">
        <h2>Expense List</h2>

        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td className="amount-col">₹{expense.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="category-badge">{expense.category}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
