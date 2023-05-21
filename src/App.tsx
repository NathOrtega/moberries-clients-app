import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";
import Filters, { HandleOnFilterArgs } from "./components/Filters";
import { editClient, getClients, removeClient, addClient } from "./api";
import { Client, Clients, ClientWithoutId } from "./types/Client";
import React from "react";
import Button from "./components/Button";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import ClientForm from "./components/ClientForm";
import Modal from "./components/Modal";

interface ListStatus {
	isSorted: boolean;
	filteredBy: {
			email: string;
			status: "All" | "Active" | "Pending" | "Blocked";
	};
}

function App() {
	const [clients, setClients] = React.useState<Clients>([]);
	const [filteredClients, setFilteredClients] = React.useState<Clients>([]);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [listStatus, setListStatus] = React.useState<ListStatus>({
		isSorted: false,
		filteredBy: {
			email: "",
			status: "All"
		}
	});

	const refreshList = () => {
		const response = getClients();
		setClients(response);
		setFilteredClients(response);
	};

	React.useEffect(() => {
		refreshList();
	}, []);

	const handleOnCreate = (client: ClientWithoutId) => {
		addClient(client);
		setIsModalOpen(false);
		refreshList();
	};

	const handleOnEdit = (client: Client) => {
		editClient(client);
		refreshList();
	};

	const handleOnRemove = (client: Client) => {
		removeClient(client);
		refreshList();
	};

	const sortClients = (clients: Clients) => {
		return [...clients].sort((clientA, clientB) => {
			return clientA.name.localeCompare(clientB.name);
		});
	};

	const handleOnSort = () => {
		if (!listStatus.isSorted) {
			const sortedClients = sortClients(filteredClients);
			setFilteredClients(sortedClients);
			setListStatus({...listStatus, isSorted: true})
		} else {
			const email = listStatus.filteredBy.email
			const statusFilter = listStatus.filteredBy.status
			handleOnFilter({email, statusFilter})
			setListStatus({...listStatus, isSorted: false})
		}
	};

	const handleOnFilter = ({ email, statusFilter }: HandleOnFilterArgs) => {
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
		setListStatus({
			...listStatus,
			filteredBy: {
				email: email,
				status: statusFilter
			}
		})
	};

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
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
