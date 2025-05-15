import { useEffect, useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/expenses`)
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h5>testing equinox backend</h5>
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
