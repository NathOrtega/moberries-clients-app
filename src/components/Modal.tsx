import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { up } from "styled-breakpoints";

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	containerElementId?: string;
	onClose: () => void;
}

export default function Modal({
	children,
	containerElementId = "modal",
	isOpen,
	onClose,
}: ModalProps) {
	React.useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);

	return ReactDOM.createPortal(
		isOpen && (
			<>
				<StyledOverlay onClick={onClose} />
				<StyledModal>{children}</StyledModal>
			</>
		),
		document.getElementById(containerElementId) as HTMLElement
	);
}

const StyledOverlay = styled.div`
	width: 100%;
	height: 100%;
	background-color: #000000;
	opacity: 0.5;
	position: fixed;
	top: 0;
`;
const StyledModal = styled.div`
	width: 350px;
	height: fit-content;
	background-color: #ffffff;
	position: fixed;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 6px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	${up("md")} {
		top: 12%;
	}

	${up("lg")} {
		top: 25%;
	}
`;
