import { styled } from "styled-components";
import Button from "./Button";

interface ClientFormProps {
	onSave: () => void;
	onCancel: () => void;
}

export default function ClientForm({ onSave, onCancel }: ClientFormProps) {
	return (
		<form>
			<label>
				<StyledLabel>Name</StyledLabel>
				<StyledInput type="text" />
			</label>
			<label>
				<StyledLabel>Email</StyledLabel>
				<StyledInput type="email" />
			</label>
			<label>
				<StyledLabel>Date of Birth</StyledLabel>
				<StyledInput type="date" />
			</label>
			<label>
				<StyledLabel>Status</StyledLabel>
				<StyledSelect name="status">
					<option value="Active">Active</option>
					<option value="Pending">Pending</option>
					<option value="Blocked">Blocked</option>
				</StyledSelect>
			</label>
			<ButtonsContainer>
				<Button variant="save" onClick={onSave} style={{ marginRight: "10px" }}>
					Save
				</Button>
				<Button variant="cancel" onClick={onCancel}>
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

const StyledInput = styled.input`
	font-size: 16px;
	margin-bottom: 10px;
	width: 100%;
	outline: none;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #011627;
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
