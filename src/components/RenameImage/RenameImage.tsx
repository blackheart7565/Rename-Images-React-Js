import React, { DragEvent, useState } from "react";

import { DragDropContent } from "../DragDropContent";
import { Empty } from "../Empty/Empty";
import { ImagesList } from "../ImagesList/ImagesList";
import { Button } from "../UI/Button/Button";
import "./RenameImage.scss";

interface IRenameImageProps { }

export const RenameImage: React.FC<IRenameImageProps> = () => {
	const [isDrop, setIsDrop] = useState<boolean>(false);
	const [dropImages, setDropImages] = useState<File[]>([]);
	const [renameImages, setRenameImages] = useState<File[]>([]);

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
						{dropImages && dropImages.length > 0
							? (
								<ImagesList images={dropImages} />
							)
							: (
								<Empty>
									Перетащите картинку(и) <br />для переименования
								</Empty>
							)}
						<div className="rename-image__inner-center">
							<span id="rename-progress">
								<i></i>
								<i></i>
								<i></i>
								<i></i>
								<i></i>
								<i></i>
								<i></i>
							</span>
						</div>
						{renameImages && renameImages.length > 0
							? (
								<ImagesList images={renameImages} />
							) : (
								<Empty>
									На данный момент<br /> переименованых картинок нету
								</Empty>
							)}
					</div>

					<div className="rename-image__btns">
						<div className="rename-image__btns-left">
							<Button>Переименовать</Button>
						</div>
						<div className="rename-image__btns-right">
							<Button>Скачать</Button>
						</div>
					</div>
				</section>
			</DragDropContent>
		</div>
	);
};