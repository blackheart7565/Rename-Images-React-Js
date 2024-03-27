import React from "react";

import { convertByteToFormatImageSize } from "../../utils/common";
import { BasketIco } from "../BasketIco";

interface IImagesItemProps {
	imageUrl?: string | ArrayBuffer | undefined;
	name?: string | undefined;
	size?: number | undefined;
	extension?: string | undefined;
}

export const ImagesItem: React.FC<IImagesItemProps> = ({
	imageUrl,
	name,
	size,
	extension
}) => {
	const src = typeof imageUrl === "string" ? imageUrl : "";
	return (
		<li className="rename-image__item">
			<div className="rename-image__image">
				<img src={src} alt="image-img" />
			</div>
			<div className="rename-image__content">
				<p className="rename-image__name">
					{name || ""}
				</p>
				<p className="rename-image__size">
					{size ? convertByteToFormatImageSize(size) : 0}
				</p>
				<p className="rename-image__extension">
					{extension || ""}
				</p>
			</div>
			<button className="rename-image__item-delete">
				<BasketIco />
			</button>
		</li>
	);
};