export interface ImageDetails {
	id: number | string;
	image: File;
	creationDate: Date;
	imageUrl: string | ArrayBuffer;
}