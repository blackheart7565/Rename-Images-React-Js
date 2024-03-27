import React from "react";

interface IBasketIcoProps { }

export const BasketIco: React.FC<IBasketIcoProps> = () => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				viewBox="0 0 64 64"
				width={"100%"}
				hanging={"100%"}
			>
				<g id="Icon-Trash" transform="translate(232 228)">
					<path id="Fill-6" d="M-207.5-205.1h3v24h-3z" className="st0" />
					<path id="Fill-7" d="M-201.5-205.1h3v24h-3z" className="st0" />
					<path id="Fill-8" d="M-195.5-205.1h3v24h-3z" className="st0" />
					<path id="Fill-9" d="M-219.5-214.1h39v3h-39z" className="st0" />
					<path
						id="Fill-10"
						d="M-192.6-212.6h-2.8v-3c0-.9-.7-1.6-1.6-1.6h-6c-.9 0-1.6.7-1.6 1.6v3h-2.8v-3c0-2.4 2-4.4 4.4-4.4h6c2.4 0 4.4 2 4.4 4.4v3"
						className="st0"
					/>
					<path
						id="Fill-11"
						d="M-191-172.1h-18c-2.4 0-4.5-2-4.7-4.4l-2.8-36 3-.2 2.8 36c.1.9.9 1.6 1.7 1.6h18c.9 0 1.7-.8 1.7-1.6l2.8-36 3 .2-2.8 36c-.2 2.5-2.3 4.4-4.7 4.4"
						className="st0"
					/>
				</g>
			</svg>
		</>
	);
};