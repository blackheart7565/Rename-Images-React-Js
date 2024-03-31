import { DragEvent, useState } from "react";
import { TDispatch } from "../types/common";
import { ImageDetails } from "../types/element";
import { readFileAsDataURL, validImageDragDrop } from "../utils/common";

interface IReturnProps {
	isDrop: boolean,
	setIsDrop: TDispatch<boolean>,

	onDrop: (event: DragEvent<HTMLDivElement>) => void;
	onDragOver: (event: DragEvent<HTMLDivElement>) => void;
	onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
	onDrag: (event: DragEvent<HTMLDivElement>) => void;
}

export const useDragDropHandler = (setImages: TDispatch<ImageDetails[]>): IReturnProps => {
	const [isDrop, setIsDrop] = useState<boolean>(false);


	const onDrop = async (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const items: DataTransferItemList = event.dataTransfer.items;
		if (!items || items.length <= 0) return;

		const imageFile = validImageDragDrop(items)
			.map(async (image: (File | null), index: number) => {
				if (!image) throw new Error('File is null');
				const creationDate: Date = new Date(image.lastModified);
				const imageUrl: (string | ArrayBuffer) = await readFileAsDataURL(image);

				return {
					id: index,
					image, creationDate, imageUrl
				} as ImageDetails;
			});

		try {
			const images = await Promise.all(imageFile);
			setImages(prev => [...prev, ...images]);
		} catch (error) {
			console.error('Error processing files:', error);
		} finally {
			setIsDrop(false);
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
		setIsDrop,

		onDrop,
		onDragOver,
		onDragLeave,
		onDrag,
	};
};