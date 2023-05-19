import { styled } from "styled-components";
import { up } from "styled-breakpoints";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { IconSortAscendingLetters } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";

export default function Navbar() {
	return (
		<StyledNavbar>
			<IconButton>
				<IconSquareRoundedPlus width={25} height={25} />
			</IconButton>
			<IconButton>
				<IconSortAscendingLetters width={25} height={25} />
			</IconButton>
			<IconButton>
				<IconFilter width={25} height={25} />
			</IconButton>
		</StyledNavbar>
	);
}

const StyledNavbar = styled.div`
	width: 350px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin: 20px auto 0;

	${up("md")} {
		width: 764px;
    margin: 30px auto 0;
	}
`;

const IconButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	width: fit-content;
	height: fit-content;
	margin-left: 10px;
`;
