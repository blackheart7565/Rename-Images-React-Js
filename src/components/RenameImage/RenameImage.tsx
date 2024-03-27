import React, { DragEvent, useState } from "react";

import { DragDropContent } from "../DragDropContent";
import { ImagesList } from "../ImagesList/ImagesList";
import { Button } from "../UI/Button/Button";
import "./RenameImage.scss";

interface IRenameImageProps { }

export const RenameImage: React.FC<IRenameImageProps> = () => {
	const [isDrop, setIsDrop] = useState<boolean>(false);
	const [dropImages, setDropImages] = useState<File[]>([]);

	const onDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const items = event.dataTransfer.items;

		if (items && items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].kind !== "file") continue;

				const file = items[i].getAsFile();
				if (!file || !file.type.startsWith("image/")) continue;

				console.log("file", file);
				setDropImages(prev => [...prev, file]);
			}
			setIsDrop(false);
		}
	};
	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDrop(true);
	};
	const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDrop(false);
	};
	const onDrag = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div
			className="rename-image"
			onDrop={onDrop}
			onDrag={onDrag}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			<DragDropContent isVisible={isDrop}>
				<section className="rename-image__wrapper">
					<div className="rename-image__header">
						<h1 className="rename-image__title">Переименование картинок</h1>
						<button className="theme-btn"></button>
					</div>

					<div className="rename-image__inner">
						<ImagesList images={dropImages} />
						<span id="rename-progress">
							<i></i>
							<i></i>
							<i></i>
							<i></i>
							<i></i>
							<i></i>
							<i></i>
						</span>
						<ImagesList images={dropImages} />
					</div>

					<div className="rename-image__btns">
						<div className="rename-image__btns-left">
							<Button>Переименовать</Button>
						</div>
						<Button>Скачать</Button>
					</div>
				</section>
			</DragDropContent>
		</div>
	);
};