import { ChangeEvent, FC } from "react";

import "./Input.scss";

interface IInputProps {
	id: string | undefined;
	placeholder?: string | undefined;
	label?: string | undefined;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
	value?: string | readonly string[] | number | undefined;
}

export const Input: FC<IInputProps> = ({
	id,
	placeholder,
	label,
	onChange,
	value,
}) => {
	return (
		<label
			htmlFor={id}
			className="input"
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