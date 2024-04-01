import JSZip from "jszip";
import { toast } from "react-toastify";
import { IImageDetails } from "../types/element";
import { NameSite } from "./constants";

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

export const deleteImageItemFromList = (images: IImageDetails[], id: number | string) => {
	return images.filter((image: IImageDetails) => image.id !== id);
};

export const compareFileMetadata = (images1: IImageDetails, images2: IImageDetails): boolean => {
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

export const downloadZipImages = (images: IImageDetails[], nameZip?: string) => {
	const zip = new JSZip();

	images.forEach(({
		image
	}: IImageDetails, index: number) => {
		const nameFile = `${image.name.split(".")[0]}.${image.name.split(".").pop()}`;
		zip.file(nameFile, image);
	});

	zip.generateAsync({ type: "blob" })
		.then((content: any) => {
			const url = URL.createObjectURL(content);
			const a = document.createElement("a");
			a.href = url;
			a.download = nameZip ?? NameSite;
			a.click();
			toast.info('Начало скачивания...');
			setTimeout(() => {
				a.remove();
				window.URL.revokeObjectURL(url);
				toast.success('Скачивание успешно завершено!');
			}, 100);
		}).catch(error => {
			console.error("Error generating zip:", error);
			toast.error(`Ошибка при создании zip: ${error}`);
		});
};

/**
* Функция которая проверяет содержит ли масив id, если да
 * то она берёт максимальный id и инкрементирует его на 1 
 * @param {IImageDetails[]} images Масив картинок
 * @returns Возвращает инкрементированный id
 */
export const resolveDuplicateIds = (images: IImageDetails[]): number => {
	const maxId = images.length > 0 ? Math.max(...images.map(({ id }: IImageDetails) => Number(id))) : 0;
	return maxId + 1;
};