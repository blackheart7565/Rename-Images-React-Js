export interface IImageDetails {
	id: number | string;
	image: File;
	creationDate: Date;
	imageUrl: string | ArrayBuffer;
}