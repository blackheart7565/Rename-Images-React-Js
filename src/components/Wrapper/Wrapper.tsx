import React, { ReactNode } from "react";


import "./Wrapper.scss";

interface IWrapperProps {
	children: ReactNode;
}

export const Wrapper: React.FC<IWrapperProps> = ({
	children,
}) => {
	return (
		<>
			{children}
		</>
	);
};