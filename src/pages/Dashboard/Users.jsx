import { useMemo, useState } from "react";
import Pagination from "@components/common/Pagination";
import LiveSearch from "@components/widgets/LiveSearch";
import mockUsers from "@data/mockUsers";

const USERS_PER_PAGE = 5;

const Users = () => {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");

	const filteredUsers = useMemo(() => {
		return mockUsers.filter((user) =>
			user.name.toLowerCase().includes(query.toLowerCase())
		);
	}, [query]);

	const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

	const paginatedUsers = filteredUsers.slice(
		(page - 1) * USERS_PER_PAGE,
		page * USERS_PER_PAGE
	);

	return (
		<section className="users">
			<header className="users-header">
				<h2>Користувачі</h2>
				<LiveSearch value={query} onChange={setQuery} />
			</header>

			<div className="stats-card">
				<table className="users-table">
					<thead>
						<tr>
							<th>Імʼя</th>
							<th>Email</th>
							<th>Роль</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUsers.map((user) => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			</div>
		</section>
	);
};

export default Users;
