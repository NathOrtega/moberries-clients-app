import { styled } from "styled-components";
import Button from "./Button";
import { Client, ClientWithoutId } from "../types/Client";
import React from "react";
import Input from "./Input";

interface ClientFormProps {
	client?: Client;
	onSave: (partialClient: ClientWithoutId) => void;
	onCancel: () => void;
}

export default function ClientForm({
	client,
	onSave,
	onCancel,
}: ClientFormProps) {
	const [updatedClient, setUpdatedClient] = React.useState<ClientWithoutId>({
		name: client?.name || "",
		email: client?.email || "",
		dateOfBirth: client?.dateOfBirth || "",
		status: client?.status || "Pending",
	});

	const handleOnSave = () => {
		onSave(updatedClient);
	};

	const handleOnChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setUpdatedClient({
			...updatedClient,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnCancel = () => {
		setUpdatedClient({
			name: "",
			email: "",
			dateOfBirth: "",
			status: "Pending",
		});
		onCancel();
	};

	return (
		<form>
			<label>
				<StyledLabel>Name</StyledLabel>
				<StyledInput
					type="text"
					value={updatedClient.name}
					onChange={handleOnChange}
					name="name"
					placeholder="John Doe"
				/>
			</label>
			<label>
				<StyledLabel>Email</StyledLabel>
				<StyledInput
					type="email"
					value={updatedClient.email}
					name="email"
					onChange={handleOnChange}
					placeholder="example@email.com"
				/>
			</label>
			<label>
				<StyledLabel>Date of Birth</StyledLabel>
				<StyledInput
					type="date"
					value={updatedClient.dateOfBirth}
					name="dateOfBirth"
					onChange={handleOnChange}
				/>
			</label>
			<label>
				<StyledLabel>Status</StyledLabel>
				<StyledSelect
					name="status"
					value={updatedClient.status}
					onChange={handleOnChange}
				>
					<option value="Active">Active</option>
					<option value="Pending">Pending</option>
					<option value="Blocked">Blocked</option>
				</StyledSelect>
			</label>
			<ButtonsContainer>
				<Button
					variant="save"
					onClick={handleOnSave}
					style={{ marginRight: "10px" }}
				>
					Save
				</Button>
				<Button variant="cancel" onClick={handleOnCancel}>
					Cancel
				</Button>
			</ButtonsContainer>
		</form>
	);
}

const StyledLabel = styled.span`
	font-weight: 600;
	color: #011627;
	font-size: 16px;
	display: block;
	margin-bottom: 3px;
`;

const StyledInput = styled(Input)`
	margin-bottom: 10px;
	padding: 5px 10px;
`;

const StyledSelect = styled.select`
	font-size: 16px;
	margin-bottom: 10px;
	outline: none;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #011627;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;
