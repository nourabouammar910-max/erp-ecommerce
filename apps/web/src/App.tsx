import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/")
      .then((res) => setMessage(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>ERP Ecommerce</h1>

      <h2>{message}</h2>
    </div>
  );
}

export default App;