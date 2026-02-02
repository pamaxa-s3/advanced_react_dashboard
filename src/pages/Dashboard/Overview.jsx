import StatsCard from "@components/widgets/StatsCard";
import OrdersTable from "@components/widgets/OrdersTable";
import SalesChart from "@components/widgets/SalesChart";
import DeferredSearch from "@components/widgets/DeferredSearch";

// Mock data для LiveSearch
import products from "@data/mockProducts";

import '@styles/dashboard.css'

export default function Overview() {
    return (
        <div className="overview">
            {/* ===== Stats ===== */}
            <div className="stats-grid">
                <StatsCard
                    title="Дохід"
                    value="₴1,245,890"
                    change={15.3}
                    icon="💵"
                />
                <StatsCard
                    title="Замовлення"
                    value="1,547"
                    change={8.2}
                    icon="🛒"
                />
                <StatsCard
                    title="Користувачі"
                    value="892"
                    change={-2.4}
                    icon="👤"
                />
                <StatsCard title="Товари" value="324" change={0} icon="📦" />
            </div>

            {/* ===== Live Search (useDeferredValue) ===== */}
            <div style={{ margin: "24px 0" }}>
                <h3>🔍 Швидкий пошук товарів</h3>
                <DeferredSearch data={products} />
            </div>

            {/* ===== Main widgets ===== */}
            <div className="widgets-grid">
                <OrdersTable />
                <SalesChart />
            </div>
        </div>
    );
}
