import React, { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard, Plus, Search, Edit, Trash2, Eye, ChefHat, DollarSign, Clock } from 'lucide-react'
import { menuItemApi } from '../../features/api/api/MenuItemApi'

const AllMenuItems: React.FC = () => {
    //RTK Query Hook
    const { data: allMenuItem,} = menuItemApi.useGetAllMenuItemsQuery()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    
    console.log("🚀 ~ AllMenuItems ~ allMenuItem:", allMenuItem)

    // Filter menu items
    const filteredItems = allMenuItem?.filter(item => {
        const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    }) || []

    const getCategoryBadge = (category: string) => {
        const categoryConfig = {
            appetizer: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Appetizer' },
            main: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Main Course' },
            dessert: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Dessert' },
            beverage: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Beverage' },
            special: { color: 'bg-red-100 text-red-800 border-red-200', label: "Chef's Special" }
        }
        const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.main
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
                {config.label}
            </span>
        )
    }

    const getStatusBadge = (available: boolean) => {
        return available ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                Available
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                Out of Stock
            </span>
        )
    }

    return (
        <AdminDashboardLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                                <ChefHat className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">Menu Management</h1>
                                <p className="text-purple-100 text-lg opacity-90 mt-2">
                                    Manage your restaurant's culinary offerings
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white bg-opacity-15 px-4 py-2 rounded-full backdrop-blur-sm">
                                <Clipboard className="w-4 h-4" />
                                <span>{allMenuItem?.length || 0} Total Menu Items</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-8 top-6 opacity-10">
                        <ChefHat size={140} />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Items', value: allMenuItem?.length || 0, color: 'purple', icon: Clipboard },
                    { label: 'Available Now', value: allMenuItem?.filter(item => item.available).length || 0, color: 'emerald', icon: Eye },
                    { label: 'Main Courses', value: allMenuItem?.filter(item => item.category === 'main').length || 0, color: 'blue', icon: ChefHat },
                    { label: 'Avg. Price', value: '$24.50', color: 'orange', icon: DollarSign }
                ].map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${
                                    stat.color === 'purple' ? 'bg-purple-50' :
                                    stat.color === 'emerald' ? 'bg-emerald-50' :
                                    stat.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'
                                }`}>
                                    <IconComponent className={`w-6 h-6 ${
                                        stat.color === 'purple' ? 'text-purple-600' :
                                        stat.color === 'emerald' ? 'text-emerald-600' :
                                        stat.color === 'blue' ? 'text-blue-600' : 'text-orange-600'
                                    }`} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Search and Actions Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search menu items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-10 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="select select-bordered focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="appetizer">Appetizers</option>
                            <option value="main">Main Courses</option>
                            <option value="dessert">Desserts</option>
                            <option value="beverage">Beverages</option>
                            <option value="special">Specials</option>
                        </select>
                    </div>
                    <button className="btn bg-purple-600 hover:bg-purple-700 text-white border-none">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Item
                    </button>
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.menu_item_id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                        {/* Item Image */}
                        <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 relative">
                            {item.image_url ? (
                                <img 
                                    src={item.image_url} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <ChefHat size={48} />
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                {getStatusBadge(item.available)}
                            </div>
                        </div>
                        
                        {/* Item Details */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                <span className="font-bold text-purple-600 text-xl">${item.price}</span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {item.description || 'No description available'}
                            </p>
                            
                            <div className="flex items-center justify-between mb-3">
                                {getCategoryBadge(item.category || 'main')}
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{item.preparation_time || '15'}min</span>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none flex-1">
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                                <button className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none flex-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                    <ChefHat className="mx-auto mb-4 text-purple-400" size={64} />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Menu Items Found</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        {searchTerm || selectedCategory !== 'all' 
                            ? 'No menu items match your search criteria. Try adjusting your filters.'
                            : 'Get started by adding your first menu item to showcase your culinary creations.'
                        }
                    </p>
                    <button className="btn bg-purple-600 hover:bg-purple-700 text-white border-none">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Your First Item
                    </button>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllMenuItems