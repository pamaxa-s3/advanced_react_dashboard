import StatsCard from "@components/widgets/StatsCard";
import LiveSearch from "@components/widgets/LiveSearch";
import OrdersTable from "@components/widgets/OrdersTable";
import SalesChart from "@components/widgets/SalesChart";

export default function Overview() {
    return (
        <div className="overview">
            <div className="stats-grid">
                <StatsCard title="Дохід" value="₴1,245,890" change={15.3} icon="💵" />
                <StatsCard title="Замовлення" value="1,547" change={8.2} icon="🛒" />
                <StatsCard title="Користувачі" value="892" change={-2.4} icon="👤" />
                <StatsCard title="Товари" value="324" change={0} icon="📦" />
            </div>

            <LiveSearch />

            <div className="widgets-grid">
                <OrdersTable />
                <SalesChart />
            </div>
        </div>
    );
}
