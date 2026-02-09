import { useMemo, useState } from "react";
import StatsCard from "@components/widgets/StatsCard";
import LiveSearch from "@components/widgets/LiveSearch";
import OrdersTable from "@components/widgets/OrdersTable";
import SalesChart from "@components/widgets/SalesChart";

import products from "@data/mockProducts";
import users from "@data/mockUsers";
import mockOrders from "@data/mockOrders";

export default function Overview({ period, refreshKey }) {
    const [query, setQuery] = useState("");

    const searchData = useMemo(
        () => [...products, ...users, ...mockOrders],
        []
    );

    const filteredOrders = useMemo(() => {
        if (!query) return mockOrders;

        const q = query.toLowerCase();

        return mockOrders.filter(
            (order) =>
                order.product.toLowerCase().includes(q) ||
                order.customer.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <div className="overview">
            <div className="stats-grid">
                <StatsCard title="Дохід" value="₴1,245,890" change={15.3} icon="💵" />
                <StatsCard title="Замовлення" value="1,547" change={8.2} icon="🛒" />
                <StatsCard title="Користувачі" value="892" change={-2.4} icon="👤" />
                <StatsCard title="Товари" value="324" change={0} icon="📦" />
            </div>

            <LiveSearch
                data={searchData}
                query={query}
                onQueryChange={setQuery}
                onSelect={() => { }}
            />

            <div className="widgets-grid">
                <OrdersTable
                    orders={filteredOrders}
                    period={period}
                    refreshKey={refreshKey}
                />
                <SalesChart period={period} refreshKey={refreshKey} />
            </div>
        </div>
    );
}
