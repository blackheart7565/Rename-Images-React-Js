import React from "react";

import "./Loader.scss";

interface ILoaderProps { }

export const Loader: React.FC<ILoaderProps> = () => {
	return (
		<span id="drag-loader" className="loader"></span>
	);
};