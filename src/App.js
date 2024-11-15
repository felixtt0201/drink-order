import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import StatisticsPage from "./pages/StatisticsPage";
import ManageMenuPage from "./pages/ManageMenuPage";
import { OrderProvider } from "./contexts/OrderContext";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/manage-menu" element={<ManageMenuPage />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
