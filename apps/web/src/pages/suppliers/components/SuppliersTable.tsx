import { Link } from "react-router-dom";

interface Props {
  suppliers: any[];
  onDelete: (id: string) => void;
}

export default function SuppliersTable({
  suppliers,
  onDelete,
}: Props) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.id}</td>

            <td>{supplier.name}</td>

            <td>{supplier.phone}</td>

            <td>{supplier.email}</td>

            <td>
              <Link
                to={`/suppliers/${supplier.id}/edit`}
              >
                Edit
              </Link>

              {" | "}

              <button
                onClick={() =>
                  onDelete(supplier.id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}