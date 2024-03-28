import React from "react";

import "./ImageCount.scss";

interface IImageCountProps {
	count?: string | number;
}

export const ImageCount: React.FC<IImageCountProps> = ({
	count,
}) => {
	return (
		<div className="image-count">
			<span className="image-count-title">Количество:</span>
			<span className="image-count-text">{count || 0}</span>
		</div>
	);
};