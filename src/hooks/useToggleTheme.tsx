import { useEffect } from "react";

import { IThemeContextType } from "../types/common";
import { useLocalStorage } from "./useLocalStorage";

export const useToggleTheme = (): IThemeContextType => {
	const [isDark, setIsDark] = useLocalStorage<boolean>("theme", false);

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