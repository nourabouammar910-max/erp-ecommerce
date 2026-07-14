import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryForm from "./components/CategoryForm";
import { categoriesApi } from "./api";

export default function EditCategoryPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState<any>(null);

  useEffect(() => {

    async function load() {

      const res = await categoriesApi.getOne(Number(id));

      setCategory(res.data);

    }

    load();

  }, [id]);

  if (!category) {

    return <p>Loading...</p>;

  }

  async function update(data: any) {

    await categoriesApi.update(
      Number(id),
      data
    );

    navigate("/categories");

  }

  return (

    <div>

      <h1>Edit Category</h1>

      <CategoryForm
        initial={category}
        onSubmit={update}
      />

    </div>

  );

}