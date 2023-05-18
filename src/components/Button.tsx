import { styled } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick: () => void;
	variant: "save" | "cancel";
}

interface StyledButtonProps {
	variant: "save" | "cancel";
}

export default function Button({ children, onClick, variant, ...rest }: ButtonProps) {
	return (
		<StyledButton onClick={onClick} variant={variant} {...rest} type="button">
			{children}
		</StyledButton>
	);
}

const StyledButton = styled.button<StyledButtonProps>`
	width: 80px;
	height: 40px;
  font-size: 16px;
  font-weight: 600;
	color: #ffffff;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
	background-color: ${(props) =>
		props.variant === "save" ? "#20a4f3" : "#41505d"};
`;
