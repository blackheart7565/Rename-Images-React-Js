
export const readFileAsDataURL = (image: File) => {
	return new Promise((resolve, rejects) => {
		const reader = new FileReader();
		reader.onload = (event) => resolve(event.target?.result);
		reader.onerror = rejects;
		reader.readAsDataURL(image);
	});
};