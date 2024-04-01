import { useState } from "react";
import { TStringNumber } from "../types/common";
import { IImageDetails } from "../types/element";
import { renameImage } from "../utils/common";

export const useRenameImages = (
	images: IImageDetails[],
) => {
	const [isLoadingRenamed, setIsLoadingRenamed] = useState<boolean>(false);

	const renamingImages = (newName: TStringNumber, loadingTimeout?: number): IImageDetails[] => {
		setIsLoadingRenamed(true);
		let renamedImages: IImageDetails[] = [];
		try {
			const isNum = typeof newName === "number";

			renamedImages = images.map((item: IImageDetails, index: number) => {
				const { image } = item;

				const name = isNum ? Number(newName) + index : `${newName}_${index + 1}`;

				const newImage = renameImage(
					image,
					`${name}.${image.name.split(".").pop()}`
				);
				return { ...item, image: newImage } as IImageDetails;
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