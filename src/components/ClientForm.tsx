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

interface Errors {
	name: string;
	email: string;
	dateOfBirth: string;
}

interface ErrorProps {
	readonly $isVisible?: boolean;
}

type ChangeEvent =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

const VALID_EMAIL_REGEX = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;

export default function ClientForm({
	client,
	onSave,
	onCancel,
	...rest
}: ClientFormProps) {
	const [updatedClient, setUpdatedClient] = React.useState<ClientWithoutId>({
		name: client?.name || "",
		email: client?.email || "",
		dateOfBirth: client?.dateOfBirth || "",
		status: client?.status || "Pending",
	});

	const [errors, setErrors] = React.useState<Partial<Errors>>({
		name: "",
		email: "",
		dateOfBirth: "",
	});

	const handleOnSave = () => {
		onSave(updatedClient);
	};

	const handleOnChange = (e: ChangeEvent) => {
		const { name: fieldName, value } = e.target;
		switch (fieldName) {
			case "name":
				setErrors({ ...errors, name: !value.trim() ? "Name is required" : "" });
				break;
			case "email": {
				let emailError = "";
				if (!value) emailError = "Email is required";
				else if (!value.match(VALID_EMAIL_REGEX))
					emailError = "Invalid email format";
				setErrors({ ...errors, email: emailError });
				break;
			}
			case "dateOfBirth":
				setErrors({
					...errors,
					dateOfBirth: !value ? "Date of Birth is required" : "",
				});
				break;
		}

		setUpdatedClient({ ...updatedClient, [fieldName]: value });
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

	const hasErrors = Object.values(errors).some((e) => !!e);
	const isFilled = Object.values(updatedClient).every((e) => !!e);
	const isFormValid = !hasErrors && isFilled;

	return (
		<form {...rest}>
			<label>
				<StyledLabel>Name</StyledLabel>
				<StyledInput
					type="text"
					value={updatedClient.name}
					onChange={handleOnChange}
					name="name"
					placeholder="John Doe"
					data-cy="nameInput"
				/>
				<Error $isVisible={!!errors.name} data-cy="nameError">{errors.name}</Error>
			</label>
			<label>
				<StyledLabel>Email</StyledLabel>
				<StyledInput
					type="email"
					value={updatedClient.email}
					name="email"
					onChange={handleOnChange}
					placeholder="example@email.com"
					data-cy="emailInput"
				/>
				<Error $isVisible={!!errors.email} data-cy="emailError">{errors.email}</Error>
			</label>
			<label>
				<StyledLabel>Date of Birth</StyledLabel>
				<StyledInput
					type="date"
					value={updatedClient.dateOfBirth}
					name="dateOfBirth"
					onChange={handleOnChange}
					data-cy="dateOfBirthInput"
				/>
				<Error $isVisible={!!errors.dateOfBirth} data-cy="dateOfBirthError">{errors.dateOfBirth}</Error>
			</label>
			<label>
				<StyledLabel>Status</StyledLabel>
				<StyledSelect
					name="status"
					value={updatedClient.status}
					onChange={handleOnChange}
					data-cy="statusSelect"
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
					disabled={!isFormValid}
					data-cy="saveClient"
				>
					Save
				</Button>
				<Button variant="cancel" onClick={handleOnCancel} data-cy="cancelCreate">
					Cancel
				</Button>
			</ButtonsContainer>
		</form>
	);
}

const Error = styled.span<ErrorProps>`
	font-size: 12px;
	min-height: 12px;
	display: block;
	color: #dd1843;
	visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
`;

const StyledLabel = styled.span`
	font-weight: 600;
	color: #011627;
	font-size: 16px;
	margin: 10px 0 3px;
	display: block;
`;

const StyledInput = styled(Input)`
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
