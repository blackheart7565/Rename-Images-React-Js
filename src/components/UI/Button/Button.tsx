import React, { HTMLAttributes } from "react";

import "./Button.scss";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

export const Button: React.FC<IButtonProps> = ({
	children,
	...props
}) => {
	return (
		<button
			className="button"
			{...props}
		>
			<span className="button__content">{children}</span>
		</button>
	);
};