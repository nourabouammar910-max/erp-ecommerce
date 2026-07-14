import { Link } from "react-router-dom";

import { suppliersApi } from "./api";

import { useSuppliers } from "./hooks/useSuppliers";

import SuppliersTable from "./components/SuppliersTable";

export default function SuppliersPage() {
  const {
    suppliers,
    loading,
    refresh,
  } = useSuppliers();

  async function remove(id: string) {
    if (!confirm("Delete supplier?")) {
      return;
    }

    await suppliersApi.remove(id);

    refresh();
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1>Suppliers</h1>

        <Link to="/suppliers/create">
          <button>
            Add Supplier
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <SuppliersTable
          suppliers={suppliers}
          onDelete={remove}
        />
      )}
    </div>
  );
}