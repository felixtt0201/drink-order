import { useState, useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

export default function MenuPage() {
  const { drinks, toppings, addOrderItem } = useContext(OrderContext);

  // 本地狀態儲存每個飲料的數量和配料選擇
  const [selectedOptions, setSelectedOptions] = useState(
    drinks.map(() => ({ quantity: 1, topping: "無配料" }))
  );

  const handleToppingChange = (index, newTopping) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index].topping = newTopping;
    setSelectedOptions(updatedOptions);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index].quantity = newQuantity;
    setSelectedOptions(updatedOptions);
  };

  const handleAddToOrder = (item, index) => {
    const { quantity, topping } = selectedOptions[index];
    const toppingDetails = toppings.find((top) => top.name === topping);
    const toppingPrice = toppingDetails ? toppingDetails.price : 0;

    const orderItem = {
      name: item.name,
      price: item.price + toppingPrice, // 將配料價格加入總價
      quantity,
      topping,
      totalPrice: (item.price + toppingPrice) * quantity,
    };

    addOrderItem(orderItem);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">飲料菜單</h1>
      <div className="grid grid-cols-1 gap-4">
        {drinks.map((item, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="block text-lg font-medium">{item.name}</span>
                <span className="text-gray-500">{item.price} 元</span>
              </div>
            </div>
            <div className="my-2">
              <label className="block font-medium">配料：</label>
              <select
                className="w-full border rounded p-2"
                value={selectedOptions[index].topping}
                onChange={(e) => handleToppingChange(index, e.target.value)}
              >
                {toppings.map((topping, toppingIndex) => (
                  <option key={toppingIndex} value={topping.name}>
                    {topping.name} (+{topping.price} 元)
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <label className="block font-medium">數量：</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded p-2"
                value={selectedOptions[index].quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
              />
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleAddToOrder(item, index)}
            >
              加入訂單
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
