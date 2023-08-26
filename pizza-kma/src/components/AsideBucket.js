import { usePizzaContext } from "../providers/PizzaDataProvider";
import sizeIcon from "../assets/images/size-icon.svg";
import weightIcon from "../assets/images/weight.svg";

import React from "react";
function Button({ type, title }) {
	const { bucketList, deleteBucketItem, updateBucketItemAmount } =
		usePizzaContext();
	//console.log("key:",title)
	const i = bucketList.map((item) => item.title).indexOf(title);

	let text;
	if (type === "less-btn") text = "–";
	else if (type === "more-btn") text = "+";
	else if (type === "delete") text = "×";

	function handleClick() {
		if (type === "less-btn") updateBucketItemAmount(i, -1);
		else if (type === "more-btn") updateBucketItemAmount(i, 1);
		else if (type === "delete") deleteBucketItem(title);
	}
	return (
		<button className={type} onClick={handleClick}>
			{text}
		</button>
	);
}
function BucketItem({ pizzaData }) {
	return (
		<section
			className="bucket-item"
			data-pizza-image="assets/images/pizza_1.jpg"
		>
			<h3>{pizzaData.title}</h3>
			<section className="size-section">
				<span className="diameter">
					<img src={sizeIcon} alt="Іконка діаметру" />
					{pizzaData.size.size}
				</span>
				<span className="weight">
					<img src={weightIcon} alt="Іконка ваги" />
					{pizzaData.size.weight}
				</span>
			</section>
			<section className="control-section">
				<span className="price">{pizzaData.size.price}грн</span>
				<div>
					<Button type="less-btn" title={pizzaData.title} />
					<span className="amount">{pizzaData.amount}</span>
					<Button type="more-btn" title={pizzaData.title} />
				</div>
				<div>
					<Button type="delete" title={pizzaData.title} />
				</div>
			</section>
			<img
				className="half-pizza"
				src={require("../" +
					pizzaData.icon.slice(0, pizzaData.icon.length - 3) +
					"png")}
				alt="pizza"
			/>
		</section>
	);
}

function AsideBucket({handleClickOpen}) {
	const { bucketList, setBucketList, totalPrice, updateTotalPrice } =
		usePizzaContext();

	function updateLocalStorage() {
		localStorage.pizzaKMA = JSON.stringify(bucketList);
	}
	
	React.useEffect(() => {
		updateLocalStorage();
	}, [bucketList]);

	

	let startX = 0;
	let endX = 0;
	const minSwipeDistance = 30;

	function touchStartHandler(e) {
		console.log(e);
		startX = e.touches[0].clientX;
	}

	function touchEndHandler(e) {
		console.log(e);
		if (window.innerWidth <= 530 && window.innerWidth > 300) {
			endX = e.changedTouches[0].clientX;
			const deltaX = endX - startX;

			if (deltaX > minSwipeDistance) {
				// Right swipe
				console.log("Swiped right");
				e.target.style.transform = "translateX(100%)";
			}
		}
	}

	function scrollBucket(e) {
		const bucket = document.getElementById("bucket");
		bucket.style.maxHeight = `calc(100vh - ${
			document.querySelector("aside header").offsetHeight +
			document.querySelector("aside footer").offsetHeight
		}px)`;
		//bucket.scrollTop = bucket.scrollHeight;
	}

	function renderBucketItems() {
		//console.log('rendering intros: ', intros)
		return bucketList.map((pizza, index) => (
			<BucketItem pizzaData={pizza} key={pizza.title} />
		));
	}

	function stringifyOrder() {
		return bucketList
			.map((pizza) => {
				return `\n${pizza.title} - ${pizza.amount} шт.`;
			})
			.join(", ");
	}
	function makeOrder() {
		if (!bucketList.length) {
			alert("Ви не вибрали жодної піци!");
		} else {
			console.log('open order')
			handleClickOpen();
		}
	}

	React.useEffect(() => {
		updateTotalPrice(bucketList);
	}, [updateTotalPrice, bucketList]);

	React.useEffect(() => {
		scrollBucket();
	}, [bucketList.length]);
	return (
		<aside
			id="bucketAside"
			onTouchStart={touchStartHandler}
			onTouchEnd={touchEndHandler}
		>
			<header>
				<h2>
					Замовлення
					<span className="quantity" id="bucketSize">
						{bucketList.length}
					</span>
				</h2>
				<button className="reset-btn" onClick={() => setBucketList([])}>
					Очистити замовлення
				</button>
			</header>
			<section className="bucket" id="bucket">
				{renderBucketItems()}
			</section>
			<footer>
				<div>
					<h4>Сума замовлення</h4>
					<h3 className="price" id="totalPrice">
						{totalPrice} грн
					</h3>
				</div>
				<button className="orange-btn" id="order" onClick={makeOrder}>
					Замовити
				</button>
			</footer>
		</aside>
	);
}

export default AsideBucket;
