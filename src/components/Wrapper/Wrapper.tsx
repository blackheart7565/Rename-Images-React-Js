import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { useTheme } from "../../hooks/useTheme";

import 'react-toastify/dist/ReactToastify.css';

interface IWrapperProps {
	children?: ReactNode | undefined;
}

export const Wrapper: React.FC<IWrapperProps> = ({
	children
}) => {
	const {
		isDark
	} = useTheme();

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={isDark ? "dark" : "light"}
			/>
			{children}
		</>
	);
};