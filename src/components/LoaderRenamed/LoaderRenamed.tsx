import React from "react";

import { TStringNumber } from "../../types/common";

import "./LoaderRenamed.scss";

interface ILoaderRenamedProps {
	size?: number | undefined;
	width?: TStringNumber | undefined;
	height?: TStringNumber | undefined;
}

export const LoaderRenamed: React.FC<ILoaderRenamedProps> = ({
	size,
	width,
	height,
}) => {
	const arrI = [...Array(size ?? 7)];
	const halfSize = Math.ceil(arrI.length / 2);

	const animDelay = (index: number) => {
		const delay = Math.abs(index + 1 - halfSize) * 0.1;
		return `${delay}s`;
	};

	return (
		<span
			id="loader-renamed"
			className="loader-renamed"
			style={{
				width: width ?? "100%",
				height: height ?? "30px",
			}}
		>
			{
				arrI.map((_, index: number) => (
					<i key={index}
						style={{
							animationDelay: animDelay(index)
						}}
					></i>
				))
			}
		</span>
	);
};