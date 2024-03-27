import React from "react";
import { convertByteToFormatImageSize } from "../../utils/common";
import { BasketIco } from "../BasketIco";

interface IImagesListProps {
	images: File[];
}
export const ImagesList: React.FC<IImagesListProps> = ({
	images,
}) => {
	return (
		<div className="rename-image__list-container">
			<ul className="rename-image__list">
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://img.freepik.com/free-photo/cute-domestic-kitten-sits-at-window-staring-outside-generative-ai_188544-12519.jpg?size=626&ext=jpg&ga=GA1.1.946239694.1711497600&semt=ais" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
					<button className="rename-image__item-delete">
						<BasketIco />
					</button>
				</li>
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://cs12.pikabu.ru/post_img/big/2022/06/30/7/1656586389126295131.jpg" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
				</li>
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://img.freepik.com/free-photo/a-girl-with-pink-hair-and-a-guitar-on-her-shirt_1340-32655.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1711497600&semt=ais" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
				</li>
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://cdn.pixabay.com/photo/2023/08/27/18/39/anime-8217716_1280.png" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
				</li>
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://img.freepik.com/free-photo/cute-domestic-kitten-sits-at-window-staring-outside-generative-ai_188544-12519.jpg?size=626&ext=jpg&ga=GA1.1.946239694.1711497600&semt=ais" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
				</li>
				<li className="rename-image__item">
					<div className="rename-image__image">
						<img src="https://img.freepik.com/free-photo/cute-domestic-kitten-sits-at-window-staring-outside-generative-ai_188544-12519.jpg?size=626&ext=jpg&ga=GA1.1.946239694.1711497600&semt=ais" alt="" />
					</div>
					<div className="rename-image__content">
						<p className="rename-image__name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, consectetur?</p>
						<p className="rename-image__size">100</p>
						<p className="rename-image__extension">JPG</p>
					</div>
				</li>
				{images.map(({
					name,
					size,
				}: File, index) => (
					<li className="rename-image__item" key={index}>
						<div className="rename-image__image">
							<img src={""} alt="image-img" />
						</div>
						<div className="rename-image__content">
							<p className="rename-image__name">
								{name.split("")[0]}
							</p>
							<p className="rename-image__size">
								{convertByteToFormatImageSize(size)}
							</p>
							<p className="rename-image__extension">
								{name.split(".").pop()}
							</p>
						</div>
						<button className="rename-image__item-delete">
							<BasketIco />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};