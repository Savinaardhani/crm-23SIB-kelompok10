import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/ProductManagement'
import Order from './pages/Order'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/Order" element={<Order/>}/>
      <Route path="/produk" element={<ProductManagement/>}/>
      </Route>
    </Routes>
  )
}

export default App
