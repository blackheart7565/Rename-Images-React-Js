import { DragEvent, useState } from "react";
import { TDispatch } from "../types/common";
import { IImageDetails } from "../types/element";
import { readFileAsDataURL, resolveDuplicateIds, validImageDragDrop } from "../utils/common";

interface IReturnProps {
	isDrop: boolean,
	isLoadingDragDrop: boolean,
	setIsDrop: TDispatch<boolean>,

	onDrop: (event: DragEvent<HTMLDivElement>) => void;
	onDragOver: (event: DragEvent<HTMLDivElement>) => void;
	onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
	onDrag: (event: DragEvent<HTMLDivElement>) => void;
}

export const useDragDropHandler = (setImages: TDispatch<IImageDetails[]>, loadingTimeout?: number): IReturnProps => {
	const [isDrop, setIsDrop] = useState<boolean>(false);
	const [isLoadingDragDrop, setIsLoadingDragDrop] = useState<boolean>(false);


	const onDrop = async (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsLoadingDragDrop(true);

		const items: DataTransferItemList = event.dataTransfer.items;
		if (!items || items.length <= 0) {
			setIsLoadingDragDrop(false);
			return;
		}

		const imageFile = validImageDragDrop(items)
			.map(async (image: (File | null), index: number) => {
				if (!image) throw new Error('File is null');
				const creationDate: Date = new Date(image.lastModified);
				const imageUrl: (string | ArrayBuffer) = await readFileAsDataURL(image);

				return {
					id: index,
					image, creationDate, imageUrl
				} as IImageDetails;
			});

		try {
			const images = await Promise.all(imageFile);

			setImages((prev) => {
				let nextId = resolveDuplicateIds(prev);
				return [
					...prev,
					...images.map(img => ({
						...img,
						id: nextId++
					}))
				];
			});
		} catch (error) {
			console.error('Error processing files:', error);
		} finally {
			setIsDrop(false);
			setTimeout(() => setIsLoadingDragDrop(false), loadingTimeout ?? 1500);
		}
	};
	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDrop(true);
	};
	const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDrop(false);
	};
	const onDrag = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return {
		isDrop,
		isLoadingDragDrop,
		setIsDrop,

		onDrop,
		onDragOver,
		onDragLeave,
		onDrag,
	};
};