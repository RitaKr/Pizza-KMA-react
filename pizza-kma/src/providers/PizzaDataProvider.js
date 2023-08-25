import React from "react";
import pizza_info from "../assets/js/Pizza_List";
const PizzaContext = React.createContext();

const PizzaDataProvider = ({ children }) => {
	const [pizzaList, setPizzaList] = React.useState(pizza_info);
	const [bucketList, setBucketList] = React.useState([]);
	const [filter, setFilter] = React.useState({ text: "Усі піци ", id: "all" });
	const [totalPrice, setTotalPrice] = React.useState(0);


	function addPizzaToCart(pizza) {
        setBucketList(prevBucketList => {
          const newBucketList = [...prevBucketList, pizza];
          
          return newBucketList;
        });
        
      }
      
      function deleteBucketItem(title) {
        setBucketList(prevBucketList => {
          const newBucketList = prevBucketList.filter(item => item.title !== title);
    
          return newBucketList;
        });
      }
      
      function updateBucketItemAmount(i, addition) {
        console.log("update amount function initiated")
        setBucketList((prevBucketList) => {
          const bucketListCopy = [...prevBucketList];
          if (bucketListCopy[i].amount === 1 && addition < 0) {
            bucketListCopy.splice(i, 1);
          } else {
            bucketListCopy[i].amount += addition;
            console.log("added", addition)
          }
      
          return bucketListCopy;
        });
      }
      
      function updateTotalPrice(updatedBucketList) {
        if (updatedBucketList) {
          let total = updatedBucketList.reduce((acc, pizza) => {
            acc += pizza.amount * pizza.size.price;
            return acc;
          }, 0);
          console.log('price updated:', total);
          setTotalPrice(total);
        }
      }
      
	function filterPizzaList(filter) {
		console.log("filter ", filter);
		switch (filter) {
			case "all": {
				setFilter({ text: "Усі піци ", id: "all" });
				setPizzaList(pizza_info);
				break;
			}
			case "meat": {
				setFilter({ text: "М'ясні ", id: "meat" });
				setPizzaList(
					pizza_info.filter((pizza) => pizza.type === "М’ясна піца")
				);
				break;
			}
			case "with-pineapples": {
				setFilter({ text: "З ананасами  ", id: "with-pineapples" });
				setPizzaList(
					pizza_info.filter((pizza) => "pineapple" in pizza.content)
				);
				break;
			}
			case "with-mushrooms": {
				setFilter({ text: "З грибами ", id: "with-mushrooms" });
				setPizzaList(pizza_info.filter((pizza) => "mushroom" in pizza.content));
				break;
			}
			case "with-seaproducts": {
				setFilter({ text: "З морепродуктами ", id: "with-seaproducts" });
				setPizzaList(
					pizza_info.filter((pizza) => pizza.type === "Морська піца")
				);
				break;
			}
			case "vega": {
				setFilter({ text: "Вега ", id: "vega" });
				setPizzaList(pizza_info.filter((pizza) => pizza.type === "Вега піца"));
				break;
			}
			default: {
			}
		}
	}

	//console.log(pizzaList);
	return (
		<PizzaContext.Provider
			value={{
				pizzaList,
				setPizzaList,
				filterPizzaList,
				bucketList,
				setBucketList,
				addPizzaToCart,
				updateBucketItemAmount,
				deleteBucketItem,
				filter,
				setFilter,
				totalPrice,
				updateTotalPrice,
			}}
		>
			{children}
		</PizzaContext.Provider>
	);
};
export const usePizzaContext = () => React.useContext(PizzaContext);

export default PizzaDataProvider;
