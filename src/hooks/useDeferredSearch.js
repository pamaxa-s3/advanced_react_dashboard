
import { useDeferredValue, useMemo, useState, useTransition } from "react";

export default function useDeferredSearch(data, key = "name") {
	const [searchTerm, setSearchTerm] = useState("");
	const [isPending, startTransition] = useTransition();
	const deferredTerm = useDeferredValue(searchTerm);

	const results = useMemo(() => {
		if (!deferredTerm) return data;
		return data.filter((item) =>
			String(item[key]).toLowerCase().includes(deferredTerm.toLowerCase())
		);
	}, [data, deferredTerm, key]);

	const onChange = (e) => {
		const value = e.target.value;
		startTransition(() => setSearchTerm(value));
	};

	return { searchTerm, results, onChange, isPending };
}
