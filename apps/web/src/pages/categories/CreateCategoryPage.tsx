import { useNavigate } from "react-router-dom";
import CategoryForm from "./components/CategoryForm";
import { categoriesApi } from "./api";

export default function CreateCategoryPage() {

  const navigate = useNavigate();

  async function save(data: any) {

    await categoriesApi.create(data);

    navigate("/categories");

  }

  return (

    <div>

      <h1>Create Category</h1>

      <CategoryForm
        onSubmit={save}
      />

    </div>

  );

}