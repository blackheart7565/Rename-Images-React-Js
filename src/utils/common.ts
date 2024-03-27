
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

export const readFileAsDataURL = (image: File) => {
	return new Promise((resolve, rejects) => {
		const reader = new FileReader();
		reader.onload = (event) => resolve(event.target?.result);
		reader.onerror = rejects;
		reader.readAsDataURL(image);
	});
};