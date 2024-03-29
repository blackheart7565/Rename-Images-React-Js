import React, { HTMLAttributes } from "react";

import "./ButtonSelect.scss";

interface IButtonSelectProps extends HTMLAttributes<HTMLButtonElement> { }

export const ButtonSelect: React.FC<IButtonSelectProps> = ({
	children,
	...props
}) => {
	return (
		<button
			className="button-select"
			{...props}
		>
			{children}
		</button>
	);
};