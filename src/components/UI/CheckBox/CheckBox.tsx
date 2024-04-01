import classNames from "classnames";
import React, { HTMLAttributes, useState } from "react";

import "./CheckBox.scss";

interface ICheckBoxProps extends HTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string | undefined;
	onChecked?: (checked: boolean) => void;
}

export const CheckBox: React.FC<ICheckBoxProps> = ({
	id,
	label,
	onChecked,
	...props
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleIsChecked = () => {
		setIsChecked(!isChecked);
		if (onChecked) {
			onChecked(!isChecked);
		}
	};

	return (
		<div
			className="check-box"
			onClick={handleIsChecked}
		>
			<label
				htmlFor={id}
				className={classNames("check-box__label", {
					"checked": isChecked
				})}
			>
				<input
					{...props}
					id={id}
					type="checkbox"
					defaultChecked={isChecked}
					className="check-box__field"
				/>
			</label>
			{label && <span className="check-box__title">{label}</span>}
		</div>
	);
};