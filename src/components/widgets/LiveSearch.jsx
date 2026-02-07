import {
	useDeferredValue,
	useMemo,
	useState,
	useTransition,
} from "react";

function highlightMatch(text, query) {
	if (!query) return text;

	const regex = new RegExp(`(${query})`, "ig");
	return text.split(regex).map((part, i) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<mark key={i}>{part}</mark>
		) : (
			part
		)
	);
}

export default function LiveSearch({ data = [], limit = 8 }) {
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);
	const [isPending, startTransition] = useTransition();

	const results = useMemo(() => {
		if (!deferredQuery) return [];

		const q = deferredQuery.toLowerCase();

		return data
			.filter(
				(item) =>
					item.name?.toLowerCase().includes(q) ||
					item.product?.toLowerCase().includes(q) ||
					item.customer?.toLowerCase().includes(q)
			)
			.slice(0, limit);
	}, [data, deferredQuery, limit]);

	function handleChange(e) {
		const value = e.target.value;

		startTransition(() => {
			setQuery(value);
		});
	}

	return (
		<div className="live-search">
			<input
				type="search"
				value={query}
				placeholder="Пошук продуктів або користувачів…"
				onChange={handleChange}
				aria-label="Live search"
			/>

			<div className="search-results">
				{isPending && <p className="muted">Завантаження результатів…</p>}

				{!isPending && deferredQuery && results.length === 0 && (
					<p className="muted">Нічого не знайдено</p>
				)}

				{!isPending && results.length > 0 && (
					<ul>
						{results.map((item) => (
							<li key={item.id}>
								{item.name && (
									<div className="result-title">
										{highlightMatch(item.name, deferredQuery)}
									</div>
								)}

								{item.product && (
									<div className="result-title">
										{highlightMatch(item.product, deferredQuery)}
									</div>
								)}

								{item.customer && (
									<div className="result-sub">
										{highlightMatch(item.customer, deferredQuery)}
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
