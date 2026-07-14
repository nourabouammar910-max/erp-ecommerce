import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import SupplierForm from "./components/SupplierForm";

import { suppliersApi } from "./api";

export default function EditSupplierPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [supplier, setSupplier] =
    useState<any>();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res =
      await suppliersApi.getOne(id!);

    setSupplier(res.data);
  }

  async function save(data: any) {
    await suppliersApi.update(id!, data);

    navigate("/suppliers");
  }

  if (!supplier) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Supplier</h1>

      <SupplierForm
        initial={supplier}
        onSubmit={save}
      />
    </div>
  );
}