import React, { Children, useEffect } from "react";
import DialogWindow from "./Dialog";
import { usePizzaContext } from "../providers/PizzaDataProvider";

function OrderItem({ pizzaData }) {
	return (
		<div className="order-item">
			<img
				src={require("../" +
					pizzaData.icon.slice(0, pizzaData.icon.length - 3) +
					"png")}
				alt="pizza"
			/>
			<h3>{pizzaData.title}</h3>

			<span className="orange">{pizzaData.amount} шт.</span>
		</div>
	);
}

function DeliveryForm({ dialogOpen, handleDialogClose }) {
	const { bucketList, setBucketList, totalPrice } = usePizzaContext();
	const [userData, setUserData] = React.useState({
		name: "",
		phone: "",
		email: "",
		city: "none",
		address: "",
		dontCall: false,
		payMethod: "",
		isNameTouched: false,
		isEmailTouched: false,
		isPhoneTouched: false,
		isAddressTouched: false,
	});

	const [formSubmitted, setFormSubmitted] = React.useState(false);

	const SuccessAlert = () => {
		return (
			<div className="row">
				<div className="alert alert-success" role="alert">
					Замовлення прийняте! Очікуйте кур'єра.
				</div>
			</div>
		);
	};

	const ErrorMessageName = ({ children }) => {
		return <div className="invalid-feedback">{children}</div>;
	};
	const getIsPhoneValid = () => {
		const pattern1 = /^\+380\d{9}$/;
		const pattern2 = /^0\d{9}$/;
		const trimmedPhone = userData.phone.replace(/\s+/g, "");
		// Use the test() method to check if the phoneNumber matches the pattern
		return pattern1.test(trimmedPhone) || pattern2.test(trimmedPhone);
	};
	const getIsEmailValid = () => {
		const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

		// Use the test() method to check if the email matches the pattern
		return emailPattern.test(userData.email.trim());
	};
	const getIsCityValid = () => {
		// Use the test() method to check if the email matches the pattern
		return userData.city !== "none";
	};

	const getIsFormValid = () => {
		return (
			userData.name &&
			getIsPhoneValid() &&
			getIsEmailValid() &&
			getIsCityValid()
		);
	};

	function renderBucketItems() {
		//console.log('rendering intros: ', intros)
		return bucketList.map((pizza, index) => (
			<OrderItem pizzaData={pizza} key={pizza.title} />
		));
	}


	function submitOrder(e) {
		e.preventDefault();
		if (getIsFormValid) {
			setUserData({
				name: "",
				phone: "",
				email: "",
				city: "none",
				address: "",
				dontCall: false,
				payMethod: "",
				isNameTouched: false,
				isEmailTouched: false,
				isPhoneTouched: false,
			});
            setFormSubmitted(true);
			
		}
	}
    useEffect(()=>{
        if (!dialogOpen && formSubmitted) {
        setFormSubmitted(false);
        setBucketList([])
    }
    }, [dialogOpen, formSubmitted])
    

	return (
		<DialogWindow
			title="Оформлення замовлення"
			open={dialogOpen}
			handleClose={handleDialogClose}
		>
			<div className="dialog-content">
            <div className="order">
							<h2>Ваше замовлення:</h2>
							<div className="order-container">{renderBucketItems()}</div>
						</div>

				{formSubmitted ? (
					<SuccessAlert />
				) : (
					<>
						
						<form className="delivery-form col-8 needs-validation">
							<div className="row">
								<div className="col-12">
									<label htmlFor="name" className="form-label">
										Ваше ім'я:
									</label>
									<input
										autoComplete="name"
										className={`form-control  add-intro-form-input ${
											userData.isNameTouched
												? userData.name
													? "is-valid"
													: "is-invalid"
												: ""
										}`}
										type="text"
										name="name"
										id="name"
										placeholder="Введіть Ваше ім'я"
										required
										value={userData.name}
										onChange={(e) => {
											setFormSubmitted(false);
											setUserData({
												...userData,
												isNameTouched: true,
												name: e.target.value,
											});
										}}
									/>
									{userData.isNameTouched && !userData.name && (
										<ErrorMessageName>Заповніть це поле!</ErrorMessageName>
									)}
								</div>
							</div>
							<div className="row">
								<div className="col-md-5 col-12">
									<label htmlFor="phone" className="form-label">
										Номер телефону:
									</label>
									<input
										autoComplete="tel"
										type="tel"
										className={`form-control  add-intro-form-input ${
											userData.isPhoneTouched
												? getIsPhoneValid()
													? "is-valid"
													: "is-invalid"
												: ""
										}`}
										name="phone"
										id="phone"
										placeholder="+380000000000"
										value={userData.phone}
										onChange={(e) => {
											setFormSubmitted(false);
											setUserData({
												...userData,
												isPhoneTouched: true,
												phone: e.target.value,
											});
										}}
									/>
									{userData.isPhoneTouched && !getIsPhoneValid() && (
										<ErrorMessageName>
											Введіть валідний номер телефону!
										</ErrorMessageName>
									)}
								</div>
								<div className="col-md-7  col-12">
									<label htmlFor="email" className="form-label">
										Електронна адреса:
									</label>
									<input
										autoComplete="email"
										type="email"
										className={`form-control  add-intro-form-input ${
											userData.isEmailTouched
												? getIsEmailValid()
													? "is-valid"
													: "is-invalid"
												: ""
										}`}
										name="email"
										id="email"
										placeholder="example@example.com"
										value={userData.email}
										onChange={(e) => {
											setFormSubmitted(false);
											setUserData({
												...userData,
												isEmailTouched: true,
												email: e.target.value,
											});
										}}
									/>
									{userData.isEmailTouched && !getIsEmailValid() && (
										<ErrorMessageName>
											Введіть валідну електронну пошту!
										</ErrorMessageName>
									)}
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label htmlFor="city" className="form-label">
										Оберіть місто:
									</label>
									<select
										autoComplete="address-level2"
										className={`form-control  add-intro-form-input ${
											getIsCityValid() ? "is-valid" : ""
										}`}
										id="city"
										value={userData.city}
										onChange={(e) => {
											setUserData({ ...userData, city: e.target.value });
										}}
										required
									>
										<option disabled value="none">
											Оберіть...
										</option>
										<option value="kyiv">Київ</option>
										<option value="lviv">Львів</option>
										<option value="kharkiv">Харків</option>
										<option value="dnipro">Дніпро</option>
										<option value="odesa">Одеса</option>
										<option value="chernihiv">Чернігів</option>
									</select>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<label htmlFor="address" className="form-label">
										Адреса доставки:
									</label>
									<input
										autoComplete="street-address"
										className={`form-control  add-intro-form-input ${
											userData.isAddressTouched
												? userData.address
													? "is-valid"
													: "is-invalid"
												: ""
										}`}
										type="text"
										name="address"
										id="address"
										placeholder="вул. Дмитра Зважія 1, парадне 1, кв. 100"
										required
										value={userData.address}
										onChange={(e) => {
											setFormSubmitted(false);
											setUserData({
												...userData,
												isAddressTouched: true,
												address: e.target.value,
											});
										}}
									/>
									{userData.isAddressTouched && !userData.address && (
										<ErrorMessageName>Заповніть це поле!</ErrorMessageName>
									)}
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											value=""
											id="dontCall"
											checked={userData.dontCall}
											onChange={() =>
												setUserData({
													...userData,
													dontCall: !userData.dontCall,
												})
											}
										/>
										<label className="form-check-label" htmlFor="dontCall">
											Не передзвонювати
										</label>
									</div>
								</div>
							</div>
							<div className="row">
								<h3>
									До сплати <span className="orange">{totalPrice}грн.</span>
								</h3>
							</div>

							<div className="row justify-content-center">
								<button
									className="orange-btn"
									name="submit"
									type="submit"
									disabled={!getIsFormValid()}
									onClick={submitOrder}
								>
									Зробити замовлення
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</DialogWindow>
	);
}

export default DeliveryForm;
