import styled from "styled-components";
import { up } from "styled-breakpoints";
import MoBerriesLogo from "../assets/MoBerriesLogo";

export default function Header() {
	return (
		<StyledHeader>
			<MoBerriesLogo style={{ maxHeight: "76px" }} />
		</StyledHeader>
	);
}

const StyledHeader = styled.div`
	width: 100%;
	height: 136px;
	padding: 36px 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #011627;

	${up("md")} {
		height: 160px;
		padding: 42px 40px;
	}

	${up("xl")} {
		height: 162px;
		padding: 45px 165px;
	}
`;
