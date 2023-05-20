import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";
import Navbar from "./components/Navbar";
import { editClient, getClients, removeClient } from "./api";
import { Client, Clients } from "./types/Client";
import React from "react";

function App() {
	const [clients, setClients] = React.useState<Clients>([])

	const reload = () => {
		setClients(getClients())
	}

	React.useEffect(() => {
		reload()
	}, [])

	const handleOnEdit = (client: Client) => {
		editClient(client)
		reload()
	}

	const handleOnRemove = (client: Client) => {
		removeClient(client)
		reload()
	}

	return (
		<>
			<Header />
			<Navbar />
			<ClientsTable clients={clients} handleOnEdit={handleOnEdit} handleOnRemove={handleOnRemove}/>
		</>
	);
}

export default App;
