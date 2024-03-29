import classNames from "classnames";
import React, { ChangeEvent } from "react";

import { useSetTheme } from "../../../hooks/useSetTheme";
import { MoonIcon } from "../../MoonIcon";
import { SunnyIcon } from "../../SunnyIcon";
import "./ButtonTheme.scss";

interface IButtonThemeProps {
	id: string;
	className?: string | undefined;
}

export const ButtonTheme: React.FC<IButtonThemeProps> = ({
	id,
	className
}) => {
	const { setIsDark } = useSetTheme();

	const handleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setIsDark(true);
		} else {
			setIsDark(false);
		}
	};

	return (
		<label
			htmlFor={id}
			className={classNames("theme-btn", className)}
		>
			<input
				id={id}
				type="checkbox"
				className="theme-btn__input"
				onChange={handleChangeTheme}
			/>
			<MoonIcon />
			<SunnyIcon />
		</label>
	);
};