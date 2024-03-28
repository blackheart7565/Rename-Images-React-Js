import { Dispatch, SetStateAction } from "react";

import { ImageDetails } from "../../types/element";
import { deleteImageItemFromList } from "../../utils/common";
import { ImagesItem } from "../ImagesItem/ImagesItem";

interface IImagesListProps {
	images: ImageDetails[];
	setImages?: Dispatch<SetStateAction<ImageDetails[]>>;
}
export const ImagesList: React.FC<IImagesListProps> = ({
	images,
	setImages,
}) => {
	const handleDeleteImageItemFromList = (id: number | string) => {
		if (!setImages) return;
		const list = deleteImageItemFromList(images, id);
		setImages(list);
	};

	return (
		<div className="rename-image__list-container">
			<ul className="rename-image__list">
				{images.map(({
					id,
					image,
					imageUrl
				}: ImageDetails, index) => (
					<ImagesItem
						key={index}
						imageUrl={imageUrl}
						name={image.name.split(".")[0]}
						size={image.size}
						onClickDeleteButton={() => handleDeleteImageItemFromList(id)}
						extension={image.name.split(".").pop()} />
				))}
			</ul>
		</div>
	);
};