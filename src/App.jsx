import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import CustomerManagement from './pages/CustomerManagement'
import ProductManagement from './pages/ProductManagement'
import SalesManagement from './pages/SalesManagement'
import FeedbackReview from './pages/FeedbackReview'
import LoyaltyReward from './pages/LoyaltyReward'

import Produk from './pages/Produk'
import PelacakanBahanBaku from './pages/PelacakanBahanBaku'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/pelanggan" element={<CustomerManagement/>}/>
      <Route path="/penjualan" element={<SalesManagement/>}/>
      <Route path="/produk" element={<ProductManagement/>}/>
      <Route path="/review" element={<FeedbackReview />} />
      <Route path="/loyalty" element={<LoyaltyReward />} />
      <Route path="/produk" element={<Produk />} />
      <Route path="/bahan-baku" element={<PelacakanBahanBaku />} />
      </Route>
    </Routes>
  )
}

export default App
