import { FC, useState } from "react";

import { useDragDropHandler } from "../../hooks/useDragDropHandler";
import { useRenameImages } from "../../hooks/useRenameImages";
import { TStringNumber } from "../../types/common";
import { ImageDetails } from "../../types/element";
import { isNumeric } from "../../utils/common";
import { NameSite } from "../../utils/constants";
import { DragDropContent } from "../DragDropContent";
import { Empty } from "../Empty/Empty";
import { ImageCount } from "../ImageCount";
import { ImagesList } from "../ImagesList/ImagesList";
import { ModalWindow } from "../ModalWindow";
import { Region } from "../Region";
import { Button } from "../UI/Button/Button";
import { ButtonSelect } from "../UI/ButtonSelect";
import { ButtonTheme } from "../UI/ButtonTheme";
import { Select } from "../UI/Select/Select";

import { SettingsIcon } from "../SettingsIcon";
import "./RenameImage.scss";

interface IRenameImageProps { }

export const RenameImage: FC<IRenameImageProps> = () => {
	const [isOpenModalWindow, setIsOpenModalWindow] = useState<boolean>(false);
	const [dropImages, setDropImages] = useState<ImageDetails[]>([]);
	const [renameImages, setRenameImages] = useState<ImageDetails[]>([]);
	const [newName, setNewName] = useState<TStringNumber>(NameSite);
	const [isNumericInput, setIsNumericInput] = useState<boolean>(false);

	const {
		isDrop,
		onDrop,
		onDrag,
		onDragOver,
		onDragLeave,
	} = useDragDropHandler(setDropImages);

	const { renamingImages } = useRenameImages(dropImages);

	const handleRenamingImages = () => {
		const renameImages = renamingImages(newName);
		setRenameImages(renameImages);
	};

	const handleSetNameClick = () => {
		setIsNumericInput(false);
		setIsOpenModalWindow(true);
	};
	const handleSetCountClick = () => {
		setIsNumericInput(true);
		setIsOpenModalWindow(true);
	};

	const onSaveValue = (value: string | number) => {
		const isNum = isNumeric(value.toString());

		if (isNumericInput && !isNum) {
			console.error("Введенное значение не является числом!");
			return;
		}
		if (!isNumericInput && isNum) {
			console.error("Введенное значение не является строкой!");
			return;
		}

		const newName = isNum ? Number(value) : value.toString();
		setNewName(newName);
		setIsOpenModalWindow(false);
	};

	return (
		<Region>
			<ModalWindow
				isOpen={isOpenModalWindow}
				setIsOpen={setIsOpenModalWindow}
				onSaveValue={onSaveValue}
			/>
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
							<ButtonTheme id="theme-btn" />
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
							<Region>
								{dropImages && dropImages.length > 0
									? (
										<ImagesList images={dropImages} setImages={setDropImages} />
									)
									: (
										<Empty>
											Перетащите картинку(и) <br />для переименование
										</Empty>
									)}
							</Region>
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
							<Region>
								{renameImages && renameImages.length > 0
									? (
										<ImagesList images={renameImages} setImages={setRenameImages} />
									) : (
										<Empty>
											На данный момент<br /> переименованных картинок нету
										</Empty>
									)}
							</Region>
						</div>

						<div className="rename-image__btns">
							<div className="rename-image__btns-left">
								<Region>
									<Button
										onClick={handleRenamingImages}
									>Переименовать</Button>
									<Select
										label={(<SettingsIcon />)}
										items={[
											{
												id: 1,
												value: (
													<ButtonSelect
														onClick={handleSetNameClick}
													>
														Установить Название
													</ButtonSelect>
												)
											},
											{
												id: 2,
												value: (
													<ButtonSelect
														onClick={handleSetCountClick}
													>
														Начать cчет
													</ButtonSelect>
												)
											},
											{
												id: 3,
												value: (
													<ButtonSelect>
														test 1
													</ButtonSelect>
												)
											},
											{
												id: 4,
												value: (
													<ButtonSelect>
														test 2
													</ButtonSelect>
												)
											},
											{
												id: 5,
												value: (
													<ButtonSelect>
														test 3
													</ButtonSelect>
												)
											},
											{
												id: 6,
												value: (
													<ButtonSelect>
														test 4
													</ButtonSelect>
												)
											},
											{
												id: 7,
												value: (
													<ButtonSelect>
														test 6
													</ButtonSelect>
												)
											},
										]}
									/>
								</Region>
								<div className="rename-image__current-name">
									<span className="rename-image__current-name-title">
										Текущее название:
									</span>
									<span className="rename-image__current-name-text">
										{newName ? newName : NameSite}
									</span>
								</div>
							</div>
							<div className="rename-image__btns-right">
								<Button>Скачать</Button>
							</div>
						</div>
					</section>
				</DragDropContent>
			</div>
		</Region>
	);
};