import classNames from "classnames";
import React, { ChangeEvent } from "react";

import { useTheme } from "../../../hooks/useTheme";
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
	const { isDark, toggleTheme } = useTheme();

	const handleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
		toggleTheme(event.target.checked);
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
				checked={isDark}
				onChange={handleChangeTheme}
			/>
			<MoonIcon />
			<SunnyIcon />
		</label>
	);
};