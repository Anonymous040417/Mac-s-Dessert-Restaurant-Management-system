import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { DollarSign, Heart, ShoppingCart, Star, User, Utensils, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import type { FavoriteItems } from '../../types/Types';
import { dashboardDataApi } from '../../features/api/api/DataboardDataApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface RecentOrders {
    id: number;
    restaurant: string;
    items: string;
    amount: number;
    status: string;
    date: string;
    rating: number;
}

const UserDashboard: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice)

    // RTK Query hook
    const { data: userStats, isLoading: userStatsLoading, error } = dashboardDataApi.useGetUserDashboardByIdQuery(
        (user?.user_id!),
        { skip: !isAuthenticated }
    )

    const recentOrders: RecentOrders[] = [
        // Your orders data
    ]

    const favoriteItems: FavoriteItems[] = [
        // Your favorite items data
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'badge-success';
            case 'In Transit': return 'badge-info';
            case 'Preparing': return 'badge-warning';
            case 'Cancelled': return 'badge-error';
            default: return 'badge-neutral';
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }

    // Restaurant information
    const restaurantInfo = {
        name: "Taste of Kenya ",
        tagline: "Authentic Cuisine, Unforgettable Experience",
        hours: "Open Today: 11:00 AM - 10:00 PM",
        location: "123 Food Street, Culinary City"
    }

    return (
        <DashboardLayout>
            {/* Enhanced Welcome Header */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-2">
                            Welcome back, {user?.first_name || 'Valued Customer'}! 👋
                        </h1>
                        <p className="text-green-100 text-lg mb-4">
                            Ready for another delicious experience at {restaurantInfo.name}?
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center bg-green-700 bg-opacity-50 px-3 py-1 rounded-full">
                                <Clock size={16} className="mr-2" />
                                {restaurantInfo.hours}
                            </div>
                            <div className="flex items-center bg-green-700 bg-opacity-50 px-3 py-1 rounded-full">
                                <MapPin size={16} className="mr-2" />
                                {restaurantInfo.location}
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-4 top-4 opacity-20">
                        <Utensils size={120} />
                    </div>
                </div>
            </div>

            {/* Enhanced User Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {userStatsLoading ? (
                    <div className="col-span-4 flex items-center justify-center h-64">
                        <div className="loading loading-spinner loading-lg text-green-800"></div>
                        <span className="ml-2 text-gray-600">Loading your dining dashboard...</span>
                    </div>
                ) : error ? (
                    <div className="col-span-4 flex items-center justify-center h-64">
                        <span className="text-red-600">Error loading dashboard data</span>
                    </div>
                ) : (
                    <>
                        <div className="bg-white shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-900">{userStats?.totalOrders}</p>
                                    <p className="text-xs text-green-600 flex items-center">
                                        <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                                        +2 this month
                                    </p>
                                </div>
                                <div className="bg-green-100 rounded-full p-3">
                                    <ShoppingCart size={36} className="text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                                    <p className="text-3xl font-bold text-gray-900">${userStats?.totalSpent}</p>
                                    <p className="text-xs text-amber-600 flex items-center">
                                        <span className="w-2 h-2 bg-amber-600 rounded-full mr-1"></span>
                                        Loyal customer
                                    </p>
                                </div>
                                <div className="bg-amber-100 rounded-full p-3">
                                    <DollarSign size={36} className="text-amber-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Loyalty Points</p>
                                    <p className="text-3xl font-bold text-gray-900">{userStats?.loyaltyPoints}</p>
                                    <p className="text-xs text-purple-600 flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-1"></span>
                                        +150 this month
                                    </p>
                                </div>
                                <div className="bg-purple-100 rounded-full p-3">
                                    <Star size={36} className="text-purple-600" fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Favorite Items</p>
                                    <p className="text-3xl font-bold text-gray-900">{userStats?.favoriteItems}</p>
                                    <p className="text-xs text-blue-600 flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-1"></span>
                                        Your top picks
                                    </p>
                                </div>
                                <div className="bg-blue-100 rounded-full p-3">
                                    <Heart size={36} className="text-blue-600" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                            <p className="text-gray-600">Your latest dining experiences</p>
                        </div>
                        <Link 
                            to="/dashboard/my-orders" 
                            className="btn bg-green-800 hover:bg-green-900 text-white border-none transform hover:scale-105 transition-all"
                        >
                            View All Orders
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingCart className="text-gray-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                                <p className="text-gray-500 mb-4">Start your culinary journey with us!</p>
                                <Link 
                                    to="/meals" 
                                    className="btn bg-green-800 hover:bg-green-900 text-white"
                                >
                                    Explore Menu
                                </Link>
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <div 
                                    key={order.id} 
                                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg">{order.items}</h3>
                                                <span className={`badge ${getStatusColor(order.status)} text-white badge-sm`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2">{order.restaurant} • {order.date}</p>
                                            <div className="flex items-center gap-4">
                                                {order.rating > 0 ? (
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(order.rating)}
                                                        <span className="text-sm text-gray-500 ml-1">({order.rating}.0)</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500">Not rated yet</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-700">${order.amount}</p>
                                            {order.status === 'Delivered' && order.rating === 0 && (
                                                <button className="btn bg-amber-500 hover:bg-amber-600 text-white mt-3 btn-sm">
                                                    Rate Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions & Restaurant Info */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link 
                                to="/menu" 
                                className="w-full btn bg-green-800 hover:bg-green-900 text-white border-none flex items-center justify-start p-4 rounded-xl transform hover:scale-105 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5 mr-3" />
                                Order Now
                            </Link>
                            <Link 
                                to="/favorites" 
                                className="w-full btn bg-amber-500 hover:bg-amber-600 text-white border-none flex items-center justify-start p-4 rounded-xl transform hover:scale-105 transition-all"
                            >
                                <Heart className="w-5 h-5 mr-3" fill="currentColor" />
                                View Favorites
                            </Link>
                            <Link 
                                to="/rewards" 
                                className="w-full btn bg-purple-600 hover:bg-purple-700 text-white border-none flex items-center justify-start p-4 rounded-xl transform hover:scale-105 transition-all"
                            >
                                <Star className="w-5 h-5 mr-3" fill="currentColor" />
                                Loyalty Rewards
                            </Link>
                            <Link 
                                to="/profile" 
                                className="w-full btn bg-blue-600 hover:bg-blue-700 text-white border-none flex items-center justify-start p-4 rounded-xl transform hover:scale-105 transition-all"
                            >
                                <User className="w-5 h-5 mr-3" />
                                Profile Settings
                            </Link>
                        </div>
                    </div>

                    {/* Restaurant Specials */}
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-xl font-bold mb-3">Today's Special</h3>
                        <p className="text-amber-100 mb-4">Grilled Salmon with Lemon Butter Sauce</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">$24.99</span>
                            <button className="btn bg-white text-amber-600 hover:bg-gray-100 border-none btn-sm">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Favorite Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Favorite Items</h2>
                        <p className="text-gray-600">Dishes you keep coming back for</p>
                    </div>
                    <Link 
                        to="/menu" 
                        className="btn btn-outline border-green-800 text-green-800 hover:bg-green-800 hover:text-white transform hover:scale-105 transition-all"
                    >
                        Browse Full Menu
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favoriteItems.length === 0 ? (
                        <div className="col-span-4 text-center py-12">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No favorites yet</h3>
                            <p className="text-gray-500">Start exploring our menu and add your favorite dishes!</p>
                        </div>
                    ) : (
                        favoriteItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-200 bg-gradient-to-b from-white to-gray-50 text-center group"
                            >
                                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-200">
                                    {item.image}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h3>
                                <p className="text-green-700 font-bold text-xl mb-2">${item.price}</p>
                                <p className="text-xs text-gray-500 mb-4">Ordered {item.orders} times</p>
                                <button className="btn bg-green-800 hover:bg-green-900 text-white w-full transform hover:scale-105 transition-all">
                                    Order Again
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard