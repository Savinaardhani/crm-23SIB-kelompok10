import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import Dashboard from "./Dashboard";
import Produk from "./Produk";
import About from "./About";
import Cart from "./Cart";
import { CartProvider } from "../../context/CartContext";
import Faq from "./Faq";
import Contact from "./Contact";
import TermsAndConditions from "./TermsAndConditions";
import LoginPage from "./LoginPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<MainLayout key={window.location.pathname} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>

    </CartProvider>
  );
}

export default App;
