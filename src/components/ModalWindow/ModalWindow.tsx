import classNames from "classnames";
import React, { useState } from "react";

import { TDispatch } from "../../types/common";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

import "./ModalWindow.scss";

interface IModalWindowProps {
	isOpen: boolean;
	setIsOpen: TDispatch<boolean>;
	isNumeric: boolean;

	onSaveValue?: (value: string | number) => void;
}

export const ModalWindow: React.FC<IModalWindowProps> = ({
	isOpen,
	setIsOpen,
	isNumeric,
	onSaveValue,
}) => {
	const [value, setValue] = useState<string>("");

	const handleSaveValue = () => {
		if (!onSaveValue) return;
		onSaveValue(value);
		setValue("");
	};

	const handleCloseModelWindow = () => {
		setValue("");
		setIsOpen(false);
	};

	return (
		<div className={classNames("modal-window", {
			"open": isOpen,
		})}
			onClick={handleCloseModelWindow}
		>
			<div className="modal-window__inner" onClick={(event) => event.stopPropagation()}>
				<Input
					className="modal-window__enter"
					id={"name-input"}
					value={value}
					placeholder={isNumeric ? "Введите число" : "Введите название"}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button
					onClick={handleSaveValue}
				>
					Сохранить
				</Button>
			</div>
		</div >
	);
};