import {
  LayoutDashboard,
  Users,
  LogOut,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
  { name: 'Pelanggan', icon: <Users />, path: '/admin/pelanggan' }, // ✅ FIXED!
]

const SidebarAdmin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    navigate('/') // logout ke halaman utama
  }

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">ADMIN PANEL</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 text-gray-700 transition mt-8"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default SidebarAdmin
