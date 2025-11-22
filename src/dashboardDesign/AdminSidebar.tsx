import { BarChart, Clipboard, ShoppingCart, StoreIcon, Users } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const AdminSidebar: React.FC = () => {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navigationItems = [
        {
            name: 'Analytics',
            path: '/admin/dashboard',
            icon: <BarChart className="w-5 h-5" />
        },
        {
            name: 'All Orders',
            path: '/admin/dashboard/all-orders',
            icon: <ShoppingCart className="w-5 h-5" />
        },
        {
            name: 'Menu Items',
            path: '/admin/dashboard/all-menu-items',
            icon: <Clipboard className="w-5 h-5" />
        },
        {
            name: 'All Customers',
            path: '/admin/dashboard/all-customers',
            icon: <Users className="w-5 h-5" />
        },
        {
            name:'All Restaurants',
            path: '/admin/dashboard/all-restaurants',
            icon: <StoreIcon className="w-5 h-5" />
        }
    ]

    return (
        <div className="bg-white border-r border-gray-200 shadow-lg transition-all duration-300 w-64 min-h-screen fixed left-0 top-0 z-40">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-800 to-green-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
                {navigationItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                ? 'bg-green-800 text-white shadow-md transform scale-105'
                                : 'text-gray-600 hover:bg-green-50 hover:text-green-800 hover:shadow-md'
                            }`}
                    >
                        <span className="shrink-0 mr-3">
                            {item.icon}
                        </span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default AdminSidebar