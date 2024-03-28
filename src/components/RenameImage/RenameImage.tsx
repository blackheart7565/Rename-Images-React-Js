import { DragEvent, FC, useState } from "react";

import { ImageDetails } from "../../types/element";
import { readFileAsDataURL, renameImage, validImageDragDrop } from "../../utils/common";
import { DragDropContent } from "../DragDropContent";
import { Empty } from "../Empty/Empty";
import { ImageCount } from "../ImageCount";
import { ImagesList } from "../ImagesList/ImagesList";
import { Button } from "../UI/Button/Button";

import { Select } from "../UI/Select/Select";
import "./RenameImage.scss";

interface IRenameImageProps { }

export const RenameImage: FC<IRenameImageProps> = () => {
	const [isDrop, setIsDrop] = useState<boolean>(false);
	const [dropImages, setDropImages] = useState<ImageDetails[]>([]);
	const [renameImages, setRenameImages] = useState<ImageDetails[]>([]);

	const onDrop = async (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const items: DataTransferItemList = event.dataTransfer.items;
		if (!items || items.length <= 0) return;

		const imageFile = validImageDragDrop(items)
			.map(async (image: (File | null), index: number) => {
				if (!image) throw new Error('File is null');
				const creationDate: Date = new Date(image.lastModified);
				const imageUrl: (string | ArrayBuffer) = await readFileAsDataURL(image);

				return {
					id: index,
					image, creationDate, imageUrl
				} as ImageDetails;
			});

		try {
			const images = await Promise.all(imageFile);
			setDropImages(prev => [...prev, ...images]);
		} catch (error) {
			console.error('Error processing files:', error);
		} finally {
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
	const handleRenamingImages = () => {
		const newName = "image";

		const renameImages = dropImages.map((item: ImageDetails, index: number) => {
			const { image } = item;
			const newImage = renameImage(image, `${newName}_${index + 1}.${image.name.split(".").pop()}`);
			return { ...item, image: newImage } as ImageDetails;
		});

		setRenameImages(renameImages);
	};

	return (
		<div
			className="rename-image"
			onDrop={onDrop}
			onDrag={onDrag}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			{/* <div className="rename-image__select">
				
			</div> */}
			<DragDropContent isVisible={isDrop}>
				<section className="rename-image__wrapper">
					<div className="rename-image__header">
						<h1 className="rename-image__title">Переименование картинок</h1>
						<button className="theme-btn"></button>
					</div>

					<div className="rename-image__counts">
						<div className="rename-image__counts-pending">
							{dropImages && dropImages.length > 0 && (
								<ImageCount count={dropImages.length} />
							)}
						</div>
						<div className="rename-image__counts-renamed">
							{renameImages && renameImages.length > 0 && (
								<ImageCount count={renameImages.length} />
							)}
						</div>
					</div>

					<div className="rename-image__inner">
						{dropImages && dropImages.length > 0
							? (
								<ImagesList images={dropImages} setImages={setDropImages} />
							)
							: (
								<Empty>
									Перетащите картинку(и) <br />для переименование
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
								<ImagesList images={renameImages} setImages={setRenameImages} />
							) : (
								<Empty>
									На данный момент<br /> переименованных картинок нету
								</Empty>
							)}
					</div>

					<div className="rename-image__btns">
						<div className="rename-image__btns-left">
							<Button
								onClick={handleRenamingImages}
							>Переименовать</Button>
							<Select
								label={(<img src={"/settings.svg"} alt="settings-icon" />)}
								items={[
									{
										id: 1,
										value: "wefwef"
									},
									{
										id: 2,
										value: "regerherhrth"
									},
								]}
							/>
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