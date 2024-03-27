import React, { HTMLAttributes } from "react";

import classNames from "classnames";
import "./DragDropContent.scss";

interface IDragDropContentProps extends HTMLAttributes<HTMLDivElement> {
	isVisible?: boolean;
}

export const DragDropContent: React.FC<IDragDropContentProps> = ({
	children,
	isVisible = false,
}) => {
	return (
		<>
			<div className={classNames("dragdrop", {
				"visible": isVisible
			})} />
			{children}
		</>
	);
};