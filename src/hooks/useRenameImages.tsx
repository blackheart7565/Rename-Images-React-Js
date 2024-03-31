import { useState } from "react";
import { TStringNumber } from "../types/common";
import { ImageDetails } from "../types/element";
import { renameImage } from "../utils/common";

export const useRenameImages = (
	images: ImageDetails[],
) => {
	const [isLoadingRenamed, setIsLoadingRenamed] = useState<boolean>(false);


	const renamingImages = (newName: TStringNumber, loadingTimeout?: number): ImageDetails[] => {
		setIsLoadingRenamed(true);
		let renamedImages: ImageDetails[] = [];
		try {
			const isNum = typeof newName === "number";

			renamedImages = images.map((item: ImageDetails, index: number) => {
				const { image } = item;

				const name = isNum ? Number(newName) + index : `${newName}_${index + 1}`;

				const newImage = renameImage(
					image,
					`${name}.${image.name.split(".").pop()}`
				);
				return { ...item, image: newImage } as ImageDetails;
			});
		} catch (error: any) {
			console.error('Ошибка при переименовании:', error);
		} finally {
			setTimeout(() => setIsLoadingRenamed(false), loadingTimeout ?? 1500);
		}

		return renamedImages;
	};

	return {
		isLoadingRenamed,
		renamingImages,
	};
};