import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";
import Filters from "./components/Filters";
import { editClient, getClients, removeClient } from "./api";
import { Client, Clients } from "./types/Client";
import React from "react";

export interface HandleOnFilterArgs {
	email: string;
	statusFilter: "Active" | "Pending" | "Blocked" | "All";
}

function App() {
	const [clients, setClients] = React.useState<Clients>([]);
	const [filteredClients, setFilteredClients] = React.useState<Clients>([]);

	const reload = () => {
		const response = getClients()
		setClients(response);
		setFilteredClients(response);
	};

	React.useEffect(() => {
		reload();
	}, []);

	const handleOnEdit = (client: Client) => {
		editClient(client);
		reload();
	};

	const handleOnRemove = (client: Client) => {
		removeClient(client);
		reload();
	};

	const handleOnFilter = React.useCallback(({ email, statusFilter }: HandleOnFilterArgs) => {
		const filteredClients = clients.filter((client) => {
			const emailMatches =
				email === ""
					? true
					: client.email.toLowerCase().includes(email.toLowerCase());

			const statusMatches = statusFilter === "All" ? true : client.status === statusFilter;

			return emailMatches && statusMatches;
		});
		setFilteredClients(filteredClients);
	}, [clients]);

	const handleOnSort = React.useCallback(() => {
		const sortedClients = [...filteredClients].sort((clientA, clientB) => {
			return clientA.name.localeCompare(clientB.name)
		})
		setFilteredClients(sortedClients)
	}, [filteredClients])

	return (
		<>
			<Header />
			<Filters onFilter={handleOnFilter} onSort={handleOnSort}/>
			<ClientsTable
				clients={filteredClients}
				handleOnEdit={handleOnEdit}
				handleOnRemove={handleOnRemove}
			/>
		</>
	);
}

export default App;
