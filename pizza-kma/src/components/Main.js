import React from "react";
import { usePizzaContext } from "../providers/PizzaDataProvider";
import sizeIcon from "../assets/images/size-icon.svg";
import weightIcon from "../assets/images/weight.svg";


function Title(props) {
	return (
		<h1>
			<span id="title">{props.text}</span>
			<span className="quantity" id="allPizzasAmount">
				{props.amount}
			</span>
		</h1>
	);
}

function FiltersNav({ applyFilter, filter, children }) {
	const FilterOptions = React.Children.map(children, (child) => {
		return React.cloneElement(child, {
			applyFilter,
			selected: child.props.id === filter.id,
		});
	});
	return (
		<nav>
			<ul>{FilterOptions}</ul>
		</nav>
	);
}
function NavItem({ id, selected, applyFilter, children }) {
	return (
		<li
			id={id}
			className={selected ? "selected" : ""}
			onClick={(e) => applyFilter(e.target.id)}
		>
			{children}
		</li>
	);
}

function PizzaCard({pizzaData}) {
    const {bucketList, updateBucketItemAmount, addPizzaToCart} = usePizzaContext();


    function bucketPizzaObject(pizza, size) {
        return { icon: pizza.icon, title: pizza.title, size: size, amount: 1 };
    }
    function handleClick(sizeType) {
        let bucketPizza = bucketPizzaObject(pizzaData, pizzaData[sizeType]);
        bucketPizza.title += ` (${(sizeType === "small_size" ? "Мала" : "Велика")})`;
        
        const i = bucketList.map((item)=> item.title).indexOf(bucketPizza.title);
        console.log(i);
        if (i===-1) {
            addPizzaToCart(bucketPizza);
        } else {
            updateBucketItemAmount(i, 1);
        }
        console.log(bucketList);
    }

    function Remark(){
        if (pizzaData.is_new) return <span className="popular remark">Популярна</span>
            else if (pizzaData.is_popular) return <span className="new remark">Нова</span>
    }
	return (
		<figure className="pizza">
            <Remark/>
		
			<img src={require("../" + pizzaData.icon)} alt="Піца Імпреза" />
			<figcaption>
				<div>
					<h2>{pizzaData.title}</h2>
					<div>
						<p className="type">{pizzaData.type}</p>
						<p className="description">{pizzaData.description}</p>
					</div>
				</div>
				<div className="size-selection">
					{pizzaData.small_size && (
						<section className="small-pizza">
							<span className="diameter">
								<img
									src={sizeIcon}
									alt="Іконка діаметру"
								/>
								{pizzaData.small_size.size}
							</span>
							<span className="weight">
								<img src={weightIcon} alt="Іконка ваги" />
								{pizzaData.small_size.weight}
							</span>
							<span className="price">
								<p>{pizzaData.small_size.price}</p>
								грн.
							</span>
							<button className="orange-btn buy" onClick={()=>handleClick("small_size")}>Купити</button>
						</section>
					)}

					{pizzaData.big_size && (
						<section className="big-pizza">
							<span className="diameter">
								<img
									src={sizeIcon}
									alt="Іконка діаметру"
								/>
								{pizzaData.big_size.size}
							</span>
							<span className="weight">
								<img src={weightIcon} alt="Іконка ваги" />
								{pizzaData.big_size.weight}
							</span>
							<span className="price">
								<p>{pizzaData.big_size.price}</p>
								грн.
							</span>
							<button className="orange-btn buy" onClick={()=>handleClick("big_size")}>Купити</button>
						</section>
					)}
				</div>
			</figcaption>
		</figure>
	);
}
function Main() {
	const { pizzaList, filterPizzaList, filter } = usePizzaContext();
    
    function generateDescription(pizza) {
        let description = [];
        Object.values(pizza.content).forEach((arr) => {
            arr.forEach((item) => description.push(item));
        });
        return description.join(", ");
    }

    function renderPizzaCards() {
        //console.log('rendering intros: ', intros)
        return pizzaList.map((pizza, index) => (
            <PizzaCard pizzaData={{...pizza, description: generateDescription(pizza)}} key={pizza.title}/>
        ))
    }
	return (
		<section className="main">
			<Title text={filter.text} amount={pizzaList.length} />
			<FiltersNav applyFilter={filterPizzaList} filter={filter}>
				<NavItem id="all">Усі</NavItem>
				<NavItem id="meat">М'ясні</NavItem>
				<NavItem id="with-pineapples">З ананасами</NavItem>
				<NavItem id="with-mushrooms">З грибами</NavItem>
				<NavItem id="with-seaproducts">З морепродуктами</NavItem>
				<NavItem id="vega">Вега</NavItem>
			</FiltersNav>

            <section className="pizza-selection" id="pizzaSelection">
                {renderPizzaCards()}
            </section>
		</section>
	);
}

export default Main;
