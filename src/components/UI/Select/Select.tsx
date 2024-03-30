import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

import { useClickOutside } from "../../../hooks/useClickOutside";

import "./Select.scss";

interface IItem {
	id: number;
	value: ReactNode;
}

interface ISelectProps {
	className?: string | undefined;
	items?: IItem[];
	isBottom?: boolean | undefined;
	label?: ReactNode;
}

export const Select: FC<ISelectProps> = ({
	className,
	items,
	isBottom = true,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
	const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

	const handleOpenDropDown = () => {
		setIsOpen(!isOpen);
	};

	const handleItemSelected = (item: IItem) => {
		setIsOpen(false);
	};


	return (
		<div
			ref={ref}
			id="select"
			className={classNames("select", className, {
				"open": isOpen,
				"bottom": isBottom
			})}
		>
			<div
				className="select__btn"
				onClick={handleOpenDropDown}
			>
				<span className="select__text">
					{selectedItem ? selectedItem.value : label || "select"}
				</span>
			</div>
			<div className={"select__dropdown"}>
				<ul className="select__list">
					{items && items.length > 0 && items.map((item: IItem) => (
						<li
							className="select__item"
							key={item.id}
							onClick={() => handleItemSelected(item)}
						>
							{item.value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};