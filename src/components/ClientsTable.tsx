import { Client, Clients } from "../types/Client";
import styled from "styled-components";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { up } from "styled-breakpoints";
import Modal from "./Modal";
import React from "react";
import ClientForm from "./ClientForm";

interface ClientsTableProps {
	clients: Clients;
	handleOnAdd?: (client: Client) => void;
	handleOnEdit: (client: Client) => void;
	handleOnRemove: (client: Client) => void;
}

interface TableDataProps {
	readonly $hasIcons?: boolean;
	readonly $width?: string;
}

export default function ClientsTable({
	clients,
	handleOnEdit,
	handleOnRemove,
	...rest
}: ClientsTableProps) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [currentClient, setCurrentClient] = React.useState<Client>();

	React.useEffect(() => {
		if (currentClient?.id) setIsModalOpen(true);
	}, [currentClient?.id]);

	const onEdit = (client: Client) => {
		setCurrentClient(client);
	};

	const onSave = (client: Client) => {
		handleOnEdit(client);
		onCancel();
	};

	const onCancel = () => {
		setCurrentClient(undefined);
		setIsModalOpen(false);
	};

	return (
		<>
			<StyledTable {...rest}>
				<StyledTableHead>
					<TableRow>
						<StyledTableHeader $width="150px">Name</StyledTableHeader>
						<StyledTableHeader $width="150px">Date Of Birth</StyledTableHeader>
						<StyledTableHeader $width="250px">Email</StyledTableHeader>
						<StyledTableHeader>Status</StyledTableHeader>
						<StyledTableHeader>Actions</StyledTableHeader>
					</TableRow>
				</StyledTableHead>
				<tbody style={{ width: "100%" }}>
					{clients.map((client, index) => (
						<TableRow key={index} data-cy={`tableRow-${client.email}`}>
							<StyledTableData width="150px" data-cy="clientName">
								<Label>Name</Label> {client.name}
							</StyledTableData>
							<StyledTableData width="150px">
								<Label>Date of Birth</Label> {client.dateOfBirth}
							</StyledTableData>
							<StyledTableData width="250px">
								<Label>Email</Label> {client.email}
							</StyledTableData>
							<StyledTableData>
								<Label>Status</Label> {client.status}
							</StyledTableData>
							<StyledTableData $hasIcons>
								<StyledButton onClick={() => onEdit(client)} data-cy={`editButton-${client.email}`}>
									<IconEdit />
								</StyledButton>
								<StyledButton onClick={() => handleOnRemove(client)} data-cy={`deleteButton-${client.email}`}>
									<IconTrash />
								</StyledButton>
							</StyledTableData>
						</TableRow>
					))}
				</tbody>
			</StyledTable>
			<Modal isOpen={isModalOpen} onClose={onCancel} data-cy="editClientModal">
				{currentClient && (
					<ClientForm
						client={currentClient}
						onSave={(partialClient) =>
							onSave({ id: currentClient.id, ...partialClient })
						}
						onCancel={onCancel}
						data-cy="editForm"
					/>
				)}
			</Modal>
		</>
	);
}

const StyledTableData = styled.td<TableDataProps>`
	width: 350px;
	margin: ${(props) => (props.$hasIcons ? "0" : "5px 0")};
	font-size: 16px;
	display: flex;
	flex-direction: row;
	justify-content: ${(props) =>
		props.$hasIcons ? "flex-end" : "space-between"};

	${up("md")} {
		width: ${(props) => (props.width ? props.width : "100px")};
		justify-content: ${(props) =>
			props.$hasIcons ? "flex-start" : "space-between"};
	}
`;

const StyledTableHeader = styled.th<TableDataProps>`
	font-size: 16px;

	${up("md")} {
		width: ${(props) => (props.$width ? props.$width : "100px")};
		text-align: start;
	}
`;

const Label = styled.span`
	font-weight: 600;
	color: #011627;

	${up("md")} {
		display: none;
	}
`;

const StyledTable = styled.table`
	width: 350px;
	margin: 0px auto 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${up("md")} {
		width: 764px;
		margin: 30px auto 30px;
		flex-direction: column;
	}
`;

const TableRow = styled.tr`
	display: block;
	padding: 20px 0;
	border-bottom: 1px solid #dd1843;

	${up("md")} {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

const StyledButton = styled.button`
	border: none;
	margin: 20px 5px 0;
	cursor: pointer;

	${up("md")} {
		margin: 0 5px;
	}
`;

const StyledTableHead = styled.thead`
	display: none;

	${up("md")} {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
`;
