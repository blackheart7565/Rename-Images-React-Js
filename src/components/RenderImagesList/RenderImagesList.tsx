import React, { ReactNode } from "react";

import { TDispatch } from "../../types/common";
import { ImageDetails } from "../../types/element";
import { Empty } from "../Empty/Empty";
import { ImagesList } from "../ImagesList/ImagesList";
import { LoaderContainer } from "../LoaderContainer/LoaderContainer";

interface IRenderImagesListProps {
	images: ImageDetails[],
	setImages: TDispatch<ImageDetails[]>,
	isLoading: boolean,
	EmptyText: ReactNode,
}

export const RenderImagesList: React.FC<IRenderImagesListProps> = ({
	images,
	setImages,
	isLoading,
	EmptyText,
}) => {
	console.log(isLoading);

	if (!images || images.length <= 0) {
		return <Empty>{EmptyText}</Empty>;
	}

	if (isLoading) {
		return <LoaderContainer />;
	}

	return <ImagesList images={images} setImages={setImages} />;
};