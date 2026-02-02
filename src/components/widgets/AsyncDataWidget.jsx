import { use, Suspense, useState } from "react";

/**
 * Mock async loader
 */
function fetchAnalyticsData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                users: 1280,
                orders: 342,
                revenue: 125430,
                conversionRate: 3.6
            });
        }, 2000);
    });
}

/**
 * Spinner для Suspense fallback
 */
function LoadingSpinner() {
    return (
        <div style={{ padding: 16, fontSize: 14, opacity: 0.7 }}>
            ⏳ Завантаження аналітики...
        </div>
    );
}

function DataDisplay({ dataPromise }) {
    const data = use(dataPromise);

    return (
        <div style={styles.data}>
            <div>
                👤 Користувачі: <b>{data.users}</b>
            </div>
            <div>
                🧾 Замовлення: <b>{data.orders}</b>
            </div>
            <div>
                💰 Дохід: <b>{data.revenue.toLocaleString()} ₴</b>
            </div>
            <div>
                📈 Конверсія: <b>{data.conversionRate}%</b>
            </div>
        </div>
    );
}

/**
 * Основний віджет
 */
export default function AsyncDataWidget() {
    const [dataPromise, setDataPromise] = useState(() => fetchAnalyticsData());

    const handleRefresh = () => {
        setDataPromise(fetchAnalyticsData());
    };

    return (
        <div style={styles.card}>
            <h3>📊 Analytics</h3>

            <Suspense fallback={<LoadingSpinner />}>
                <DataDisplay dataPromise={dataPromise} />
            </Suspense>

            <button onClick={handleRefresh} style={styles.button}>
                🔄 Перезавантажити
            </button>
        </div>
    );
}

/**
 * styles
 */
const styles = {
    card: {
        padding: 16,
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#fff",
        maxWidth: 360
    },
    data: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 12,
        fontSize: 14
    },
    button: {
        padding: 8,
        borderRadius: 8,
        border: "none",
        background: "#10b981",
        color: "#fff",
        cursor: "pointer"
    }
};
