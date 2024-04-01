import React, { HTMLAttributes } from "react";

import "./CheckBox.scss";

interface ICheckBoxProps extends HTMLAttributes<HTMLInputElement> {
	label?: string | undefined;
}

export const CheckBox: React.FC<ICheckBoxProps> = ({
	label,
	...props
}) => {
	return (
		<label className="check-box">
			<input
				{...props}
				type="checkbox"
				className="check-box__enter"
			/>
			{label && <span className="check-box__label">{label}</span>}
		</label>
	);
};