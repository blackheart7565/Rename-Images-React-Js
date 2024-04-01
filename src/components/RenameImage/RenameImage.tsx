import { FC, useState } from "react";
import { toast } from "react-toastify";

import { useDragDropHandler } from "../../hooks/useDragDropHandler";
import { useRenameImages } from "../../hooks/useRenameImages";
import { TStringNumber } from "../../types/common";
import { IImageDetails } from "../../types/element";
import { convertImageToJpgAsync, downloadZipImages, getExtensionFile, isNumeric } from "../../utils/common";
import { NameSite } from "../../utils/constants";
import { DragDropContent } from "../DragDropContent";
import { ImageCount } from "../ImageCount";
import { LoaderRenamed } from "../LoaderRenamed/LoaderRenamed";
import { ModalWindow } from "../ModalWindow";
import { Region } from "../Region";
import { RenderImagesList } from "../RenderImagesList/RenderImagesList";
import { SettingsIcon } from "../SettingsIcon";
import { Button } from "../UI/Button/Button";
import { ButtonSelect } from "../UI/ButtonSelect";
import { ButtonTheme } from "../UI/ButtonTheme";
import { CheckBox } from "../UI/CheckBox/CheckBox";
import { Select } from "../UI/Select/Select";
import { Wrapper } from "../Wrapper/Wrapper";

import "./RenameImage.scss";

interface IRenameImageProps { }

export const RenameImage: FC<IRenameImageProps> = () => {
	const [isOpenModalWindow, setIsOpenModalWindow] = useState<boolean>(false);
	const [isConvertToJpg, setIsConvertToJpg] = useState<boolean>(false);
	const [isNumericInput, setIsNumericInput] = useState<boolean>(false);
	const [dropImages, setDropImages] = useState<IImageDetails[]>([]);
	const [renameImages, setRenameImages] = useState<IImageDetails[]>([]);
	const [newName, setNewName] = useState<TStringNumber>(NameSite);

	const {
		isDrop,
		isLoadingDragDrop,
		onDrop,
		onDrag,
		onDragOver,
		onDragLeave,
	} = useDragDropHandler(setDropImages);

	const {
		isLoadingRenamed,
		renamingImages
	} = useRenameImages(dropImages);

	const handleRenamingImages = async () => {
		if (!dropImages || dropImages.length <= 0) {
			toast.error("Нету картинок для переименование!");
			return;
		}

		const renameImages: IImageDetails[] = renamingImages(newName);

		if (isConvertToJpg) {
			const convertJpgImages: IImageDetails[] = await Promise.all(renameImages.map(async (img: IImageDetails): Promise<IImageDetails> => {
				return {
					...img,
					image: getExtensionFile(img.image.name) === "jpg"
						? img.image
						: await convertImageToJpgAsync(img.image, true, (error) => {
							toast.error(`Произошла ошибка при конвертации изображения: ${error}`);
						}),
				};
			}));

			setRenameImages(convertJpgImages);
		} else {
			setRenameImages(renameImages);
		}
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
			toast.error("Введенное значение не является числом!");
			return;
		}
		if (!isNumericInput && isNum) {
			console.error("Введенное значение не является строкой!");
			toast.error("Введенное значение не является строкой!");
			return;
		}

		const newName = isNum ? Number(value) : value.toString();
		setNewName(newName);
		setIsOpenModalWindow(false);
	};
	const handleDownloadImages = () => {
		if (!renameImages || renameImages.length <= 0) {
			toast.error("Error: Нету переименованых файлов!");
			return;
		}

		downloadZipImages(renameImages, NameSite);
	};
	const handleIsConvertToJpg = (checked: boolean) => {
		setIsConvertToJpg(checked);
	};

	return (
		<Wrapper>
			<ModalWindow
				isNumeric={isNumericInput}
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
								<RenderImagesList
									images={dropImages}
									setImages={setDropImages}
									isLoading={isLoadingDragDrop}
									EmptyText={
										<>Перетащите картинку(и) <br />для переименование</>
									}
								/>
							</Region>
							<div className="rename-image__inner-center">
								{isLoadingRenamed && <LoaderRenamed size={10} />}
							</div>
							<Region>
								<RenderImagesList
									images={renameImages}
									setImages={setRenameImages}
									isLoading={isLoadingRenamed}
									EmptyText={
										<>На данный момент<br /> переименованных картинок нету</>
									}
								/>
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
													<CheckBox
														id="checkbox-convert"
														onChecked={handleIsConvertToJpg}
														label="Конвертировать в jpg?"
													/>
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
								<Button
									onClick={handleDownloadImages}
								>
									Скачать
								</Button>
							</div>
						</div>
					</section>
				</DragDropContent>
			</div>
		</Wrapper>
	);
};