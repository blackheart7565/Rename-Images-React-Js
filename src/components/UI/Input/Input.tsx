import classNames from "classnames";
import { ChangeEvent, FC } from "react";

import "./Input.scss";

interface IInputProps {
	className?: string | undefined;
	id: string | undefined;
	placeholder?: string | undefined;
	label?: string | undefined;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
	value?: string | readonly string[] | number | undefined;
}

export const Input: FC<IInputProps> = ({
	className,
	id,
	placeholder,
	label,
	onChange,
	value,
}) => {
	return (
		<label
			htmlFor={id}
			className={classNames("input", className)}
		>
			{label && <span className="input__label">{label}</span>}
			<input
				id={id}
				type={"text"}
				value={value}
				placeholder={placeholder || ""}
				className="input__field"
				onChange={onChange}
			/>
		</label>
	);
};