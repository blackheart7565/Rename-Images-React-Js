import React, { ReactNode } from "react";

import { TDispatch } from "../../types/common";
import { IImageDetails } from "../../types/element";
import { Empty } from "../Empty/Empty";
import { ImagesList } from "../ImagesList/ImagesList";
import { LoaderContainer } from "../LoaderContainer/LoaderContainer";

interface IRenderImagesListProps {
	images: IImageDetails[],
	setImages: TDispatch<IImageDetails[]>,
	isLoading: boolean,
	EmptyText: ReactNode,
}

export const RenderImagesList: React.FC<IRenderImagesListProps> = ({
	images,
	setImages,
	isLoading,
	EmptyText,
}) => {
	if (!images || images.length <= 0) {
		return <Empty>{EmptyText}</Empty>;
	}

	if (isLoading) {
		return <LoaderContainer />;
	}

	return <ImagesList images={images} setImages={setImages} />;
};