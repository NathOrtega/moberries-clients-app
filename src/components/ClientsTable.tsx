import { User } from "../types/User";
import { styled } from "styled-components";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { up } from "styled-breakpoints";
import Modal from "./Modal";
import React from "react";
import ClientForm from "./ClientForm";

interface ClientsTableProps {
	users: Array<User>;
}

interface TableDataProps {
	readonly $hasIcons?: boolean;
	readonly $width?: string;
}

export default function ClientsTable({ users }: ClientsTableProps) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const handleOnSave = () => {
		console.log("Saved!");
	};

	const handleOnCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<StyledTable>
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
					{users.map((user, index) => (
						<TableRow key={index}>
							<StyledTableData width="150px">
								<Label>Name</Label> {user.name}
							</StyledTableData>
							<StyledTableData width="150px">
								<Label>Date of Birth</Label> {user.dateOfBirth}
							</StyledTableData>
							<StyledTableData width="250px">
								<Label>Email</Label> {user.email}
							</StyledTableData>
							<StyledTableData>
								<Label>Status</Label> {user.status}
							</StyledTableData>
							<StyledTableData $hasIcons>
								<StyledButton onClick={() => setIsModalOpen(true)}>
									<IconEdit />
								</StyledButton>
								<StyledButton>
									<IconTrash />
								</StyledButton>
							</StyledTableData>
						</TableRow>
					))}
				</tbody>
			</StyledTable>
			<Modal
				containerElementId="modal"
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			>
				<ClientForm onSave={handleOnSave} onCancel={handleOnCancel} />
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
	margin: 20px auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${up("md")} {
		width: 764px;
		margin: 50px auto;
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
