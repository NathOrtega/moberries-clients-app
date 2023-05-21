import styled from "styled-components";
import { up } from "styled-breakpoints";
import { IconSortAscendingLetters } from "@tabler/icons-react";
import React from "react";
import Input from "./Input";

interface FiltersProps {
	onFilter: ({ email, statusFilter }: HandleOnFilterArgs) => void;
	onSort: () => void;
}

export interface HandleOnFilterArgs {
	email: string;
	statusFilter: "Active" | "Pending" | "Blocked" | "All";
}

export default function Filters({ onFilter, onSort, ...rest }: FiltersProps) {
	const [filters, setFilters] = React.useState<HandleOnFilterArgs>({
		email: "",
		statusFilter: "All",
	});

	const handleOnChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const newFilters = {
			...filters,
			[e.target.name]: e.target.value,
		};
		setFilters(newFilters);
		onFilter(newFilters);
	};

	return (
		<FiltersContainer {...rest}>
			<StyledInput
				type="email"
				placeholder="Search by email"
				onChange={handleOnChange}
				name="email"
				title="Filter by email"
				data-cy="filterInput"
			/>
			<StyledSelect
				name="statusFilter"
				onChange={handleOnChange}
				title="Filter by status"
				data-cy="statusFilter"
			>
				<option value="All">All</option>
				<option value="Active">Active</option>
				<option value="Pending">Pending</option>
				<option value="Blocked">Blocked</option>
			</StyledSelect>
			<IconButton
				onClick={onSort}
				type="button"
				title="Sort by name in alphabetical order"
				data-cy="sort"
			>
				<IconSortAscendingLetters width={25} height={25} />
			</IconButton>
		</FiltersContainer>
	);
}

const FiltersContainer = styled.div`
	width: 350px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 20px auto 0;

	${up("md")} {
		width: 764px;
		margin: 30px auto 0;
	}
`;

const StyledInput = styled(Input)`
	width: 55%;
	padding: 5px 10px;

	${up("md")} {
		width: 70%;
	}
`;

const StyledSelect = styled.select`
	height: 32px;
	font-size: 16px;
	outline: none;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #011627;
`;

const IconButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	width: fit-content;
	height: fit-content;
`;
