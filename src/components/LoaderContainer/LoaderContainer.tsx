import React from "react";

import { Loader } from "../Loader/Loader";

import "./LoaderContainer.scss";

interface ILoaderContainerProps { }

export const LoaderContainer: React.FC<ILoaderContainerProps> = () => {
	return (
		<div className="loader-container">
			<Loader />
		</div>
	);
};