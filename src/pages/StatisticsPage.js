import { useContext, useState, useMemo } from "react";
import { OrderContext } from "../contexts/OrderContext";
import dayjs from "dayjs";

export default function StatisticsPage() {
  const { dailyOrders, drinks, toppings } = useContext(OrderContext);
  const [filter, setFilter] = useState("全部");
  const [selectedItem, setSelectedItem] = useState("全部品項");

  // 提取所有品項清單（從 drinks 中取得）
  const uniqueItems = useMemo(() => {
    const items = drinks.map((drink) => drink.name);
    return ["全部品項", ...items];
  }, [drinks]);

  // 過濾訂單資料
  const filteredOrders = useMemo(() => {
    const today = dayjs();

    return dailyOrders.filter((order) => {
      // 時間篩選
      const matchesDate =
        filter === "當日"
          ? dayjs(order.timestamp).isSame(today, "day")
          : filter === "當月"
          ? dayjs(order.timestamp).isSame(today, "month")
          : true;

      // 品項篩選
      const matchesItem =
        selectedItem === "全部品項" || order.name === selectedItem;

      return matchesDate && matchesItem;
    });
  }, [dailyOrders, filter, selectedItem]);

  // 配料顯示格式化
  const formatTopping = (toppingName) => {
    const topping = toppings.find((t) => t.name === toppingName);
    return topping ? `${topping.name} (+${topping.price}元)` : toppingName;
  };

  // 計算總金額與總數量
  const totalAmount = filteredOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );
  const totalQuantity = filteredOrders.reduce(
    (sum, order) => sum + order.quantity,
    0
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">訂單統計</h1>

      {/* 篩選選項 */}
      <div className="mb-4">
        <label className="font-medium mr-2">篩選時間：</label>
        <select
          className="border p-2 rounded mr-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="全部">全部</option>
          <option value="當日">當日</option>
          <option value="當月">當月</option>
        </select>

        <label className="font-medium mr-2">篩選品項：</label>
        <select
          className="border p-2 rounded"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          {uniqueItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* 訂單表格 */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">品項</th>
            <th className="border px-4 py-2">配料</th>
            <th className="border px-4 py-2">數量</th>
            <th className="border px-4 py-2">金額</th>
            <th className="border px-4 py-2">時間</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {order.name} ({order.price}元)
              </td>
              <td className="border px-4 py-2">
                {formatTopping(order.topping)}
              </td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">{order.totalPrice} 元</td>
              <td className="border px-4 py-2">
                {dayjs(order.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 總金額與總數量 */}
      <div className="mt-4 text-lg font-bold">
        <p>總金額：{totalAmount} 元</p>
        <p>總數量：{totalQuantity} 杯</p>
      </div>
    </div>
  );
}
