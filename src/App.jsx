import { useEffect, useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/expenses`)
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error("API error:", err));
  }, []);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    // For now, update local state only, with a temporary id
    const newExpense = {
      id: Date.now(), // temp id
      title,
      amount: parseFloat(amount),
    };
    setExpenses((prev) => [...prev, newExpense]);

    setTitle("");
    setAmount("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h5>testing equinox backend</h5>

      <form onSubmit={handleAddExpense} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {exp.title}: ${exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
