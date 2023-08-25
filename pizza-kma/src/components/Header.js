import logoCorner from "../assets/images/discount.svg";
import cartIcon from "../assets/images/shopping-basket.png";

function Header() {
	function clickHandler(e) {
		document.getElementById("bucketAside").style.transform = "translateX(0)";
	}
	return (
		<header>
			<span className="logo">
				<p>
					<span>PIZZA</span>KMA
				</p>
				<img
					src={logoCorner}
					className="logo-corner rotated"
					alt="logo corner"
				/>
			</span>
			<div className="info">
				<section className="upper-section">
					<div>
						<span className="tel">(044) 222 5 222</span>
						<span className="working-hours">24 години/ 7 днів на тиждень</span>
						<span className="free-delivery">Безкоштовна доставка піци</span>
					</div>

					<button className="orange-btn quit-btn">Вийти</button>
					<button className="orange-btn open-bucket-btn" id="openBucketBtn" onClick={clickHandler}>
						<img src={cartIcon} alt="Замовлення" />
					</button>
				</section>
				<hr />
				<section>
					<p>Піца</p>

					<button className="orange-btn quit-btn">Вийти</button>
				</section>
			</div>
		</header>
	);
}

export default Header;
