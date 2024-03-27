import React, { HTMLAttributes } from "react";

import "./Empty.scss";

interface IEmptyProps extends HTMLAttributes<HTMLDivElement> { }

export const Empty: React.FC<IEmptyProps> = ({
	children,
}) => {
	return (
		<div className="empty">
			{children}
		</div>
	);
};