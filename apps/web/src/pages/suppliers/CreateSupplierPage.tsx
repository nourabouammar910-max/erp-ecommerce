import { useNavigate } from "react-router-dom";

import SupplierForm from "./components/SupplierForm";

import { suppliersApi } from "./api";

export default function CreateSupplierPage() {
  const navigate = useNavigate();

  async function save(data: any) {
    await suppliersApi.create(data);

    navigate("/suppliers");
  }

  return (
    <div>
      <h1>Create Supplier</h1>

      <SupplierForm
        onSubmit={save}
      />
    </div>
  );
}