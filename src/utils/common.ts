
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