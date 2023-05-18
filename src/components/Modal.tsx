import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
	containerElementId: string;
}

interface StyledModalContainerProps {
	readonly isOpen?: boolean;
}

export default function Modal({
	children,
	containerElementId,
	isOpen,
	setIsOpen,
}: ModalProps) {
	return ReactDOM.createPortal(
		<StyledModalContainer isOpen={isOpen}>
			<StyledOverlay onClick={() => setIsOpen(false)} />
			<StyledModal>{children}</StyledModal>
		</StyledModalContainer>,
		document.getElementById(containerElementId) as HTMLElement
	);
}

const StyledModalContainer = styled.div<StyledModalContainerProps>`
	display: ${(props) => (props.isOpen ? "block" : "none")};;
`

const StyledOverlay = styled.div`
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.5;
	position: absolute;
	top: 0;
`;
const StyledModal = styled.div`
	width: 350px;
	height: 217px;
	background-color: #ffffff;
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 6px;
`;
