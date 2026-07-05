export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3>Products</h3>
          <p className="text-3xl font-bold mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Orders</h3>
          <p className="text-3xl font-bold mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Purchases</h3>
          <p className="text-3xl font-bold mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3>Inventory</h3>
          <p className="text-3xl font-bold mt-4">0</p>
        </div>
      </div>
    </>
  );
}