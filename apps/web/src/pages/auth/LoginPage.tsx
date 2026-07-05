import { useEffect } from "react";
import { api } from "../../services/api";

export default function LoginPage() {
  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log("Backend Response:", res.data);
      })
      .catch((err) => {
        console.error("Connection Error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          ERP Ecommerce
        </h1>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Email"
        />

        <input
          className="mb-6 w-full rounded-lg border p-3"
          placeholder="Password"
          type="password"
        />

        <button className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}