import JSZip from "jszip";
import { toast } from "react-toastify";
import { ErrorType } from "../types/common";
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

	return `${size.toFixed(2)} ${units[unitsIndex]}`;
};

export const getExtensionFile = (value: string) => {
	return value.split(".").pop();
};

export const readFileAsDataURL = (image: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => resolve(event.target?.result as string);
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
	const maxId = images.length > 0
		? Math.max(...images.map(({ id }: IImageDetails) => Number(id)))
		: 0;
	return maxId + 1;
};

export const loadImageOntoCanvas = (
	imgSrc: string,
	callback: (image: HTMLImageElement) => void
): void => {
	const image = new Image();
	image.src = imgSrc;

	image.onload = () => {
		callback(image);
	};

	image.onerror = (error: string | Event) => {
		throw new Error('Ошибка при загрузке изображения: ' + error);
	};
};

export const convertBase64ToJpgFile = (base64Data: string, fileName: string): File => {
	const mimeType = "image/jpeg";
	// atob - глобальная функция которая декодирует даные в формате Base64
	// split - используем что бы убрать префикс data:image/jpeg;base64
	const byteCharacters = atob(base64Data.split(",")[1]);
	const byteArray = new Uint8Array(Array.from(byteCharacters, char => char.charCodeAt(0)));
	const blob = new Blob([byteArray], { type: mimeType });
	const file = new File([blob], `${fileName}.jpg`, { type: mimeType });
	return file;
};

export const convertImageToJpgAsync = async (image: File, isOriginalDate?: boolean, callbackError?: (error: ErrorType) => void): Promise<File> => {
	if (!window.FileReader) {
		throw new Error("Ваш браузер не поддерживает FileReader. Пожалуйста, обновите браузер или используйте другой.");
	}
	const mimeType: string = "image/jpeg";
	const nameImage: string = image.name.split(".")[0];

	try {
		const imageUrl: string = await readFileAsDataURL(image);
		const canvas: HTMLCanvasElement = document.createElement("canvas");
		const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

		await new Promise<void>((resolve, _): void => {
			loadImageOntoCanvas(imageUrl, (loadedImage: HTMLImageElement): void => {
				canvas.width = loadedImage.width;
				canvas.height = loadedImage.height;
				if (ctx) {
					ctx.drawImage(loadedImage, 0, 0);
				}
				resolve();
			});
		});
		const jpgImage: string = canvas.toDataURL(mimeType);
		const file: File = convertBase64ToJpgFile(jpgImage, nameImage);

		if (isOriginalDate ?? false) {
			Object.defineProperty(file, "lastModified", {
				value: image.lastModified,
				writable: false,
			} as PropertyDescriptor);
		}

		return file;
	} catch (error) {
		const errorMessage = `Произошла ошибка при конвертации изображения: ${error instanceof Error ? error.message : error}`;
		console.error(errorMessage);
		if (callbackError) {
			callbackError(error);
		}
		throw error;
	}
};