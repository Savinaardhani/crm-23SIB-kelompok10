import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Produk from "./pages/Produk";
import About from "./pages/About";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/TermsAndConditions";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<MainLayout />}>
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
