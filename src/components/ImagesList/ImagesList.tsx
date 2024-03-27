import React from "react";
import { convertByteToFormatImageSize } from "../../utils/common";
import { BasketIco } from "../BasketIco";

interface IImagesListProps {
	images: File[];
}
export const ImagesList: React.FC<IImagesListProps> = ({
	images,
}) => {
	return (
		<div className="rename-image__list-container">
			<ul className="rename-image__list">
				{images.map(({
					name,
					size,
				}: File, index) => (
					<li className="rename-image__item" key={index}>
						<div className="rename-image__image">
							<img src={""} alt="image-img" />
						</div>
						<div className="rename-image__content">
							<p className="rename-image__name">
								{name.split("")[0]}
							</p>
							<p className="rename-image__size">
								{convertByteToFormatImageSize(size)}
							</p>
							<p className="rename-image__extension">
								{name.split(".").pop()}
							</p>
						</div>
						<button className="rename-image__item-delete">
							<BasketIco />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};