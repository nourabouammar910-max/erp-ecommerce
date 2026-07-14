import { useEffect, useState } from "react";

import { suppliersApi } from "../api";

export function useSuppliers() {

  const [suppliers, setSuppliers] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  async function refresh() {

    setLoading(true);

    const res = await suppliersApi.getAll();

    setSuppliers(res.data);

    setLoading(false);

  }

  useEffect(() => {

    refresh();

  }, []);

  return {

    suppliers,

    loading,

    refresh,

  };

}