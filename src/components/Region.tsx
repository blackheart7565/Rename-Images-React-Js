import { FC, Fragment, ReactNode } from "react";

interface IRegionProps {
	children: ReactNode;
}

export const Region: FC<IRegionProps> = ({
	children
}) => {
	return (
		<Fragment>
			{children}
		</Fragment>
	);
};