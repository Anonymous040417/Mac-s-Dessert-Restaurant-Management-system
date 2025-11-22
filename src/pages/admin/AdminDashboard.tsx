import React from 'react'
import type {  RecentOrder } from '../../types/Types'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard, DollarSign, ShoppingCart, Users, Plus, FileText, Settings, ChefHat, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { dashboardDataApi } from '../../features/api/api/DataboardDataApi';

const AdminDashboard: React.FC = () => {
    

    //RTK Query Hook
    const { data: dashboardData} = dashboardDataApi.useGetAdminDashboardDataQuery()

    const recentOrders: RecentOrder[] = [
        { id: 1, customer: "John Doe", amount: 45.50, status: "Delivered", time: "2 hours ago" },
        { id: 2, customer: "Jane Smith", amount: 32.75, status: "Preparing", time: "30 min ago" },
        { id: 3, customer: "Mike Johnson", amount: 67.25, status: "Ready", time: "15 min ago" },
        { id: 4, customer: "Sarah Wilson", amount: 28.90, status: "Delivered", time: "1 hour ago" }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Preparing': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Ready': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle className="w-4 h-4" />;
            case 'Preparing': return <ChefHat className="w-4 h-4" />;
            case 'Ready': return <Clock className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Premium Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                                <ChefHat className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-bold">Restaurant Dashboard</h1>
                        </div>
                        <p className="text-green-100 text-lg opacity-90">Welcome to Mathe's Eatery Management</p>
                        <div className="flex items-center gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-1 rounded-full">
                                <TrendingUp className="w-4 h-4" />
                                <span>Performance: Excellent</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-1 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                                <span>All systems operational</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-6 top-6 opacity-10">
                        <ChefHat size={120} />
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    {
                        title: "Total Orders",
                        value: dashboardData?.totalOrders,
                        icon: ShoppingCart,
                        color: "green",
                        trend: "+12%",
                        description: "This month"
                    },
                    {
                        title: "Total Revenue",
                        value: `$${dashboardData?.totalRevenue.toLocaleString()}`,
                        icon: DollarSign,
                        color: "emerald",
                        trend: "+8%",
                        description: "Revenue growth"
                    },
                    {
                        title: "Total Customers",
                        value: dashboardData?.totalCustomers,
                        icon: Users,
                        color: "blue",
                        trend: "+15",
                        description: "New customers"
                    },
                    {
                        title: "Menu Items",
                        value: dashboardData?.totalMenuItems,
                        icon: Clipboard,
                        color: "purple",
                        trend: "+3",
                        description: "New items"
                    }
                ].map((stat, index) => {
                    const IconComponent = stat.icon;
                  

                    return (
                        <div 
                            key={index}
                            className={`bg-white rounded-2xl shadow-xl p-6 border transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={'text-xs font-semibold '}>
                                            {stat.trend}
                                        </span>
                                        <span className="text-xs text-gray-500">{stat.description}</span>
                                    </div>
                                </div>
                                <div className={'p-4 rounded-2xl  group-hover:scale-110 transition-transform duration-300'}>
                                    <IconComponent className={'w-8 h-8 '} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Orders - Wider Column */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                                <p className="text-gray-500 text-sm mt-1">Latest customer activities</p>
                            </div>
                            <button className="btn bg-green-800 hover:bg-green-900 text-white border-none px-6 rounded-xl font-semibold transform hover:scale-105 transition-all">
                                View All
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div 
                                    key={order.id} 
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-200 border border-gray-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border">
                                            <Users className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                                            <p className="text-sm text-gray-500">{order.time}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-green-700 text-lg">${order.amount}</p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="text-sm font-medium">{order.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Analytics Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Plus, label: "Add Menu Item", color: "bg-green-800 hover:bg-green-900" },
                                { icon: ShoppingCart, label: "New Order", color: "bg-orange-500 hover:bg-orange-600" },
                                { icon: FileText, label: "View Reports", color: "bg-blue-600 hover:bg-blue-700" },
                                { icon: Settings, label: "Settings", color: "bg-purple-600 hover:bg-purple-700" }
                            ].map((action, index) => {
                                const IconComponent = action.icon;
                                return (
                                    <button 
                                        key={index}
                                        className={`btn ${action.color} text-white border-none flex items-center justify-start p-4 rounded-xl transform hover:scale-105 transition-all duration-200`}
                                    >
                                        <IconComponent className="w-5 h-5 mr-3" />
                                        <span className="font-semibold">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-4">Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Order Accuracy</span>
                                <span className="font-bold">98.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Avg. Prep Time</span>
                                <span className="font-bold">18min</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Customer Rating</span>
                                <span className="font-bold">4.8/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AdminDashboard