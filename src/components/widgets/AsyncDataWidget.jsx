import { use, Suspense, useState } from "react";

/**
 * Mock async loader
 */
function fetchAnalyticsData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                users: 1000 + Math.floor(Math.random() * 500),
                orders: 300 + Math.floor(Math.random() * 100),
                revenue: 100000 + Math.floor(Math.random() * 50000),
                conversionRate: (Math.random() * 5).toFixed(2)
            });
        }, 2000);
    });
}

function LoadingSpinner() {
    return <div className="spinner">⏳ Завантаження аналітики...</div>;
}

function DataDisplay({ dataPromise }) {
    const data = use(dataPromise);

    return (
        <div className="analytics-data">
            <div>👤 Користувачі: <b>{data.users}</b></div>
            <div>🧾 Замовлення: <b>{data.orders}</b></div>
            <div>💰 Дохід: <b>{data.revenue.toLocaleString()} ₴</b></div>
            <div>📈 Конверсія: <b>{data.conversionRate}%</b></div>
        </div>
    );
}

export default function AsyncDataWidget() {
    const [dataPromise, setDataPromise] = useState(fetchAnalyticsData);
    const [version, setVersion] = useState(0);

    const handleRefresh = () => {
        setDataPromise(fetchAnalyticsData());
        setVersion(v => v + 1); // 🔑 force remount Suspense
    };

    return (
        <div className="analytics-card">
            <h3 className="analytics-title">📊 Analytics</h3>

            <Suspense key={version} fallback={<LoadingSpinner />}>
                <DataDisplay dataPromise={dataPromise} />
            </Suspense>

            <button className="analytics-button" onClick={handleRefresh}>
                🔄 Перезавантажити
            </button>
        </div>
    );
}
