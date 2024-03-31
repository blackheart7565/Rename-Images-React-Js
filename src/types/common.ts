import { Dispatch, ReactNode, SetStateAction } from "react";

export type TDispatch<T> = Dispatch<SetStateAction<T>>;

export type TStringNumber = string | number;


export interface IThemeContextType {
	isDark: boolean;
	toggleTheme: (flag?: boolean) => void;
}

export interface IThemeProvider {
	children: ReactNode;
}