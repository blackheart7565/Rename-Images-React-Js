import { ImageDetails } from "../types/element";
import { renameImage } from "../utils/common";

export const useRenameImages = (
	images: ImageDetails[],
) => {

	const renamingImages = (newName: string | number): ImageDetails[] => {
		console.log(newName, typeof newName);

		const isNum = typeof newName === "number";

		return images.map((item: ImageDetails, index: number) => {
			const { image } = item;

			const name = isNum ? Number(newName) + index : `${newName}_${index + 1}`;

			const newImage = renameImage(
				image,
				`${name}.${image.name.split(".").pop()}`
			);
			return { ...item, image: newImage } as ImageDetails;
		});
	};

	return {
		renamingImages,
	};
};