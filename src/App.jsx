import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import CustomerManagement from './pages/CustomerManagement'
import Produk from './pages/Produk'
import PelacakanBahanBaku from './pages/PelacakanBahanBaku'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/pelanggan" element={<CustomerManagement/>}/>
      <Route path="/produk" element={<Produk />} />
      <Route path="/bahan-baku" element={<PelacakanBahanBaku />} />
      </Route>
    </Routes>
  )
}

export default App
