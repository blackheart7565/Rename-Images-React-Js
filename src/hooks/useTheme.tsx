import { useContext } from "react";
import { ThemeContext } from "../components/provider/ThemeProvider";
import { IThemeContextType } from "../types/common";

export const useTheme = (): IThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};