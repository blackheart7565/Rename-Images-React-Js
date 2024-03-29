import { ImageDetails } from "../types/element";

export const convertByteToFormatImageSize = (byte: number) => {
	const units: Array<string> = ['B', 'KB', 'MB', 'GB', 'TB'];
	let unitsIndex: number = 0;
	let size: number = byte;

	while (size >= 1024 && unitsIndex < units.length - 1) {
		size /= 1024;
		unitsIndex++;
	}

	return `${size.toFixed(1)} ${units[unitsIndex]}`;
};

export const readFileAsDataURL = (image: File): Promise<string | ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => resolve(event.target?.result ?? "");
		reader.onerror = (event: ProgressEvent<FileReader>) => reject(event.target?.error);
		reader.readAsDataURL(image);
	});
};

export const validImageDragDrop = (items: DataTransferItemList) => {
	return Array.from(items)
		.filter(item => item.kind === "file")
		.map(item => item.getAsFile())
		.filter(file => file && file.type.startsWith("image/"));
};

export const deleteImageItemFromList = (images: ImageDetails[], id: number | string) => {
	return images.filter((image: ImageDetails) => image.id !== id);
};

export const compareFileMetadata = (images1: ImageDetails, images2: ImageDetails): boolean => {
	const fileProps: (keyof File)[] = [
		"lastModified",
		"size",
		"type",
		"webkitRelativePath"
	];
	return fileProps.every(prop => images1.image[prop] === images2.image[prop]);
};

export const renameImage = (image: File, newName: string, isWritableLastModified: boolean = false): File => {
	const renameImage = new File([image], newName, { type: image.type });

	Object.defineProperty(renameImage, "lastModified", {
		value: image.lastModified,
		writable: isWritableLastModified,
	} as PropertyDescriptor);

	return renameImage;
};


/**
 * Функция для проверки, содержит ли строка только цифры
 * @param {string} value 
 * @returns возвращает `true` если в строке только цыфры, в противном случаии `false`
 */
export const isNumeric = (value: string) => {
	return /^\d+$/.test(value);
};