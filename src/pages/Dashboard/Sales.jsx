import { Suspense, useState } from "react";
import SalesChart from "@components/widgets/SalesChart";
import OrdersTable from "@components/widgets/OrdersTable";
import LoadingSpinner from "@components/common/LoadingSpinner";

const Sales = () => {
	const [period, setPeriod] = useState("month");

	return (
		<section className="sales">
			<header className="sales-header">
				<h2>Продажі</h2>

				<select
					value={period}
					onChange={(e) => setPeriod(e.target.value)}
					aria-label="Період продажів"
				>
					<option value="week">Тиждень</option>
					<option value="month">Місяць</option>
					<option value="year">Рік</option>
				</select>
			</header>

			<div className="widgets-grid">
				<Suspense fallback={<LoadingSpinner overlay />}>
					<SalesChart period={period} />
				</Suspense>

				<Suspense fallback={<LoadingSpinner overlay />}>
					<OrdersTable />
				</Suspense>
			</div>
		</section>
	);
};

export default Sales;
