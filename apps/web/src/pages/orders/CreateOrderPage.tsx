import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
interface Product {
  id: string;
  name: string;
  price: number;
}

interface Warehouse {
  id: string;
  name: string;
}

export default function CreateOrderPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const productsRes = await api.get("/products");
      const warehousesRes = await api.get("/warehouses");

      setProducts(
        Array.isArray(productsRes.data)
          ? productsRes.data
          : [productsRes.data]
      );

      setWarehouses(
        Array.isArray(warehousesRes.data)
          ? warehousesRes.data
          : [warehousesRes.data]
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function createOrder() {
    if (!warehouseId) {
      alert("Select warehouse");
      return;
    }

    if (!productId) {
      alert("Select product");
      return;
    }

    const product = products.find((p) => p.id === productId);

    if (!product) return;

    try {
      setLoading(true);

      await api.post("/orders", {
        warehouseId,
        items: [
          {
            productId,
            quantity,
            price: product.price,
          },
        ],
      });

      alert("Order created successfully");

      navigate("/orders");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">

      <h2>Create Order</h2>

      <div style={{ marginBottom: 20 }}>

        <label>Warehouse</label>

        <br />

        <select
          value={warehouseId}
          onChange={(e) => setWarehouseId(e.target.value)}
        >
          <option value="">Select Warehouse</option>

          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

      </div>

      <div style={{ marginBottom: 20 }}>

        <label>Product</label>

        <br />

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ${p.price}
            </option>
          ))}
        </select>

      </div>

      <div style={{ marginBottom: 20 }}>

        <label>Quantity</label>

        <br />

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

      </div>

      <button
        onClick={createOrder}
        disabled={loading}
      >
        {loading ? "Saving..." : "Create Order"}
      </button>

    </div>
  );
}