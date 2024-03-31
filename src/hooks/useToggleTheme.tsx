import { useEffect, useState } from "react";

import { IThemeContextType } from "../types/common";

export const useToggleTheme = (): IThemeContextType => {
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		document.body.setAttribute('data-theme', isDark ? "dark" : "light");
	}, [isDark]);

	const toggleTheme = (flag?: boolean) => {
		setIsDark(flag !== undefined ? flag : !isDark);
	};

	return {
		isDark,
		toggleTheme
	};
};