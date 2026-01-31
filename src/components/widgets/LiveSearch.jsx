import { useDeferredValue, useMemo, useState } from "react";

export default function DeferredSearch({ data }) {

	const [searchTerm, setSearchTerm] = useState("");

	const deferredSearchTerm = useDeferredValue(searchTerm);

	const isPending = searchTerm !== deferredSearchTerm;

	const results = useMemo(() => {
		if (!deferredSearchTerm) return data;

		return data.filter((item) =>
			item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
		);
	}, [data, deferredSearchTerm]);

	// функція підсвітки знайденого тексту
	function highlightText(text, query) {
		if (!query) return text;

		const regex = new RegExp(`(${query})`, "gi");
		const parts = text.split(regex);

		return parts.map((part, index) =>
			part.toLowerCase() === query.toLowerCase() ? (
				<mark key={index}>{part}</mark>
			) : (
				part
			)
		);
	}

	return (
		<div style={{ maxWidth: 400 }}>
			<input
				type="text"
				placeholder="Пошук..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ width: "100%", padding: 8 }}
			/>

			<div style={{ marginTop: 12 }}>
				{isPending && <p style={{ opacity: 0.6 }}>Завантаження результатів...</p>}

				{!isPending && results.length === 0 && <p>Нічого не знайдено</p>}

				{!isPending && results.length > 0 && (
					<ul>
						{results.map((item) => (
							<li key={item.id}>{highlightText(item.name, deferredSearchTerm)}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
