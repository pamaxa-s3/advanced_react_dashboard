import AsyncErrorBoundary from "@components/common/AsyncErrorBoundary";
import AsyncDataWidget from "@components/widgets/AsyncDataWidget";
import OrdersTable from "@components/widgets/OrdersTable";
import SalesChart from "@components/widgets/SalesChart";
import LoadingSpinner from "@components/common/LoadingSpinner";

export default function Analytics() {
  return (
    <div className="analytics">
      <h2>📊 Аналітика</h2>

      {/* ===== Async Data Widget ===== */}
      <AsyncErrorBoundary fallback={<LoadingSpinner />}>
        <AsyncDataWidget />
      </AsyncErrorBoundary>

      {/* ===== Orders Table ===== */}
      <AsyncErrorBoundary fallback={<LoadingSpinner />}>
        <OrdersTable />
      </AsyncErrorBoundary>

      {/* ===== Sales Chart ===== */}
      <AsyncErrorBoundary fallback={<LoadingSpinner />}>
        <SalesChart />
      </AsyncErrorBoundary>
    </div>
  );
}