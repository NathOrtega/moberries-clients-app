import { styled } from "styled-components";
import { up } from "styled-breakpoints";
import { IconSortAscendingLetters } from "@tabler/icons-react";
import React from "react";
import { HandleOnFilterArgs } from "../App";

interface FiltersProps {
	onFilter: ({ email, statusFilter }: HandleOnFilterArgs) => void;
	onSort: () => void;
}

export default function Filters({ onFilter, onSort }: FiltersProps) {
	const [filters, setFilters] = React.useState<HandleOnFilterArgs>({
		email: "",
		statusFilter: "All",
	});

	React.useEffect(() => {
		onFilter(filters);
	}, [filters.email, filters.statusFilter, onFilter, filters]);

	const handleOnChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<FiltersContainer>
			<StyledInput
				type="email"
				placeholder="Search by email"
				onChange={handleOnChange}
				name="email"
				title="Filter by email"
			/>
			<StyledSelect name="statusFilter" onChange={handleOnChange} title="Filter by status">
				<option value="All">All</option>
				<option value="Active">Active</option>
				<option value="Pending">Pending</option>
				<option value="Blocked">Blocked</option>
			</StyledSelect>
			<IconButton onClick={onSort} type="button" title="Sort by name in alphabetical order">
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

const StyledInput = styled.input`
	height: 32px;
	width: 55%;
	font-size: 16px;
	outline: none;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #011627;

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
