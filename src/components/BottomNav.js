import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3 z-50">
      <Link to="/" className="text-lg hover:text-blue-400">
        訂單管理
      </Link>
      <Link to="/statistics" className="text-lg hover:text-blue-400">
        訂單統計
      </Link>
      <Link to="/manage-menu" className="text-lg hover:text-blue-400">
        產品管理
      </Link>
    </div>
  );
}
