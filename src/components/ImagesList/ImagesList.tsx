import React from "react";
import { ImageDetails } from "../../types/element";
import { ImagesItem } from "../ImagesItem/ImagesItem";

interface IImagesListProps {
	images: ImageDetails[];
}
export const ImagesList: React.FC<IImagesListProps> = ({
	images,
}) => {
	return (
		<div className="rename-image__list-container">
			<ul className="rename-image__list">
				{images.map(({
					image,
					imageUrl
				}: ImageDetails, index) => (
					<ImagesItem
						key={index}
						imageUrl={imageUrl}
						name={image.name.split(".")[0]}
						size={image.size}
						extension={image.name.split(".").pop()} />
				))}
			</ul>
		</div>
	);
};