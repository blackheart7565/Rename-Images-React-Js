import { FC, createContext, useMemo } from "react";
import { useToggleTheme } from "../../hooks/useToggleTheme";
import { IThemeContextType, IThemeProvider } from "../../types/common";

export const ThemeContext = createContext<IThemeContextType | null>(null);

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
	const theme = useToggleTheme();

	const value = useMemo(() => (
		theme
	), [theme]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
};