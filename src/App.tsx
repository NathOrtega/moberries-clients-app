import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";
import Filters from "./components/Filters";
import { editClient, getClients, removeClient, addClient } from "./api";
import { Client, Clients, clientWithoutId } from "./types/Client";
import React from "react";
import Button from "./components/Button";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import ClientForm from "./components/ClientForm";
import Modal from "./components/Modal";

export interface HandleOnFilterArgs {
	email: string;
	statusFilter: "Active" | "Pending" | "Blocked" | "All";
}

function App() {
	const [clients, setClients] = React.useState<Clients>([]);
	const [filteredClients, setFilteredClients] = React.useState<Clients>([]);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const reload = () => {
		const response = getClients();
		setClients(response);
		setFilteredClients(response);
	};

	React.useEffect(() => {
		reload();
	}, []);

	const handleOnCreate = (client: clientWithoutId) => {
		addClient(client);
		setIsModalOpen(false);
		reload();
	};

	const handleOnEdit = (client: Client) => {
		editClient(client);
		reload();
	};

	const handleOnRemove = (client: Client) => {
		removeClient(client);
		reload();
	};

	const handleOnFilter = React.useCallback(
		({ email, statusFilter }: HandleOnFilterArgs) => {
			const filteredClients = clients.filter((client) => {
				const emailMatches =
					email === ""
						? true
						: client.email.toLowerCase().includes(email.toLowerCase());

				const statusMatches =
					statusFilter === "All" ? true : client.status === statusFilter;

				return emailMatches && statusMatches;
			});
			setFilteredClients(filteredClients);
		},
		[clients]
	);

	const handleOnSort = React.useCallback(() => {
		const sortedClients = [...filteredClients].sort((clientA, clientB) => {
			return clientA.name.localeCompare(clientB.name);
		});
		setFilteredClients(sortedClients);
	}, [filteredClients]);

	return (
		<>
			<Header />
			<ButtonContainer>
				<StyledButton variant="save" onClick={() => setIsModalOpen(true)}>
					Create
				</StyledButton>
			</ButtonContainer>
			<Filters onFilter={handleOnFilter} onSort={handleOnSort} />
			<ClientsTable
				clients={filteredClients}
				handleOnEdit={handleOnEdit}
				handleOnRemove={handleOnRemove}
			/>
			<Modal
				containerElementId="modal"
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<ClientForm
					onSave={handleOnCreate}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</>
	);
}

const StyledButton = styled(Button)`
	width: 100px;
	background-color: #dd1843;
`;

const ButtonContainer = styled.div`
	width: 350px;
	margin: 20px auto 0px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	${up("md")} {
		width: 764px;
		margin: 30px auto 0;
	}
`;

export default App;
