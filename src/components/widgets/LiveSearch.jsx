import {
	useDeferredValue,
	useMemo,
	useRef,
	useState,
} from "react";

function highlightMatch(text, query) {
	if (!query || typeof text !== "string") return text;

	const regex = new RegExp(`(${query})`, "ig");
	return text.split(regex).map((part, i) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<mark key={i}>{part}</mark>
		) : (
			part
		)
	);
}

export default function LiveSearch({
	data = [],
	limit = 8,
	query,
	onQueryChange,
	onSelect,
}) {
	const deferredQuery = useDeferredValue(query);
	const [open, setOpen] = useState(false);
	const inputRef = useRef(null);

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
		onQueryChange(value);
		setOpen(true);
	}

	function handleSelect(item) {
		const value =
			item.product || item.customer || item.name;

		onQueryChange(value);
		onSelect?.(item);
		setOpen(false);
		inputRef.current?.blur();
	}

	function handleBlur() {
		// даємо клікнути по пункту
		setTimeout(() => setOpen(false), 150);
	}

	return (
		<div className="live-search">
			<input
				ref={inputRef}
				type="search"
				value={query}
				placeholder="Пошук продуктів або користувачів…"
				onChange={handleChange}
				onFocus={() => setOpen(true)}
				onBlur={handleBlur}
				aria-label="Live search"
			/>

			{open && query && (
				<div className="search-results">
					{results.length === 0 && (
						<p className="muted">Нічого не знайдено</p>
					)}

					{results.length > 0 && (
						<ul>
							{results.map((item) => (
								<li
									key={`${item.id}-${item.email || ""}`}
									onMouseDown={() =>
										handleSelect(item)
									}
								>
									{item.name && (
										<div className="result-title">
											{highlightMatch(
												item.name,
												deferredQuery
											)}
										</div>
									)}

									{item.product && (
										<div className="result-title">
											{highlightMatch(
												item.product,
												deferredQuery
											)}
										</div>
									)}

									{item.customer && (
										<div className="result-sub">
											{highlightMatch(
												item.customer,
												deferredQuery
											)}
										</div>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
