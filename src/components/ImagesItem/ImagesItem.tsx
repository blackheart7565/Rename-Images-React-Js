import React, { HTMLAttributes, MouseEvent } from "react";

import { convertByteToFormatImageSize } from "../../utils/common";
import { BasketIco } from "../BasketIco";

interface IImagesItemProps extends HTMLAttributes<HTMLLIElement> {
	imageUrl?: string | ArrayBuffer | undefined;
	name?: string | undefined;
	size?: number | undefined;
	extension?: string | undefined;
	onClickDeleteButton?: (event?: MouseEvent<HTMLButtonElement> | undefined) => void;
}

export const ImagesItem: React.FC<IImagesItemProps> = ({
	imageUrl,
	name,
	size,
	extension,
	onClickDeleteButton,
	...props
}) => {
	const src = typeof imageUrl === "string" ? imageUrl : "";
	return (
		<li
			className="rename-image__item"
			{...props}
		>
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
			<button className="rename-image__item-delete"
				onClick={onClickDeleteButton}
			>
				<BasketIco />
			</button>
		</li>
	);
};