import { useState, useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

export default function ManageMenuPage() {
  const {
    drinks,
    toppings,
    addDrinkItem,
    addToppingItem,
    removeDrinkItem,
    removeToppingItem,
  } = useContext(OrderContext);

  const [newDrink, setNewDrink] = useState({ name: "", price: "" });
  const [newTopping, setNewTopping] = useState({ name: "", price: "" });

  const handleAddDrink = (e) => {
    e.preventDefault();
    if (newDrink.name && newDrink.price) {
      addDrinkItem(newDrink);
      setNewDrink({ name: "", price: "" });
    }
  };

  const handleAddTopping = (e) => {
    e.preventDefault();
    if (newTopping.name && newTopping.price) {
      addToppingItem(newTopping);
      setNewTopping({ name: "", price: "" });
    }
  };

  const handleRemoveDrink = (name) => {
    removeDrinkItem(name);
  };

  const handleRemoveTopping = (name) => {
    removeToppingItem(name);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">管理菜單</h1>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">飲料品項</h2>
        <form onSubmit={handleAddDrink} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="飲料名稱"
            value={newDrink.name}
            onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="價格"
            value={newDrink.price}
            onChange={(e) =>
              setNewDrink({ ...newDrink, price: parseInt(e.target.value) })
            }
            className="w-1/2 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            新增
          </button>
        </form>
        <ul>
          {drinks.map((drink, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{drink.name}</span>
              <span>{drink.price} 元</span>
              <button
                onClick={() => handleRemoveDrink(drink.name)}
                className="text-red-500"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">配料品項</h2>
        <form onSubmit={handleAddTopping} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="配料名稱"
            value={newTopping.name}
            onChange={(e) =>
              setNewTopping({ ...newTopping, name: e.target.value })
            }
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="價格"
            value={newTopping.price}
            onChange={(e) =>
              setNewTopping({ ...newTopping, price: parseInt(e.target.value) })
            }
            className="w-1/2 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            新增
          </button>
        </form>
        <ul>
          {toppings.map((topping, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{topping.name}</span>
              <span>{topping.price} 元</span>
              {topping.name !== "無配料" && (
                <button
                  onClick={() => handleRemoveTopping(topping.name)}
                  className="text-red-500"
                >
                  刪除
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
