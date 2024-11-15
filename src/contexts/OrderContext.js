import { createContext, useState } from "react";
import dayjs from "dayjs";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [drinks, setDrinks] = useState([
    { name: "紅茶", price: 30 },
    { name: "紅茶牛奶", price: 55 },
    { name: "冬瓜茶", price: 30 },
    { name: "冬瓜牛奶", price: 55 },
  ]);

  const [toppings, setToppings] = useState([
    { name: "無配料", price: 0 },
    { name: "珍珠", price: 10 },
  ]);

  const [dailyOrders, setDailyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);

  const addOrderItem = (item) => {
    const newItem = {
      ...item,
      totalPrice: item.price * item.quantity,
      timestamp: dayjs(), // 新增時間戳
    };
    setDailyOrders([...dailyOrders, newItem]);
    setMonthlyOrders([...monthlyOrders, newItem]);
    setTotalOrders([...totalOrders, newItem]);
  };

  const addDrinkItem = (drink) => {
    setDrinks([...drinks, drink]);
  };

  const addToppingItem = (topping) => {
    setToppings([...toppings, topping]);
  };

  const removeDrinkItem = (drinkName) => {
    setDrinks(drinks.filter((drink) => drink.name !== drinkName));
  };

  const removeToppingItem = (toppingName) => {
    if (toppingName === "無配料") return;
    setToppings(toppings.filter((topping) => topping.name !== toppingName));
  };

  return (
    <OrderContext.Provider
      value={{
        dailyOrders,
        monthlyOrders,
        totalOrders,
        addOrderItem,
        drinks,
        toppings,
        addDrinkItem,
        addToppingItem,
        removeDrinkItem,
        removeToppingItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
