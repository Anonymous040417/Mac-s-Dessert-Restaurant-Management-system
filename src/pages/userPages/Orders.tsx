import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { Package, Clock, CheckCircle, XCircle, Truck, Utensils, Star,  MessageCircle } from 'lucide-react'
import { orderApi } from '../../features/api/api/OrderApi'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import type { RootState } from '../../store/store'

const Orders: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

    const { data: userOrders, isLoading, error } = orderApi.useGetAllOrderByCustomerIdQuery(
        isAuthenticated ? user!.user_id : skipToken
    )

    // Helper functions
    const getStatusConfig = (status: string) => {
        const statusConfig = {
            pending: { 
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                icon: Clock, 
                label: 'Pending',
                description: 'We\'re confirming your order'
            },
            confirmed: { 
                color: 'bg-blue-100 text-blue-800 border-blue-200', 
                icon: CheckCircle, 
                label: 'Confirmed',
                description: 'Order confirmed - preparing soon'
            },
            preparing: { 
                color: 'bg-purple-100 text-purple-800 border-purple-200', 
                icon: Utensils, 
                label: 'Preparing',
                description: 'Chef is cooking your meal'
            },
            ready: { 
                color: 'bg-green-100 text-green-800 border-green-200', 
                icon: CheckCircle, 
                label: 'Ready',
                description: 'Your order is ready for pickup'
            },
            out_for_delivery: { 
                color: 'bg-orange-100 text-orange-800 border-orange-200', 
                icon: Truck, 
                label: 'Out for Delivery',
                description: 'Your food is on the way!'
            },
            delivered: { 
                color: 'bg-green-100 text-green-800 border-green-200', 
                icon: CheckCircle, 
                label: 'Delivered',
                description: 'Enjoy your meal!'
            },
            cancelled: { 
                color: 'bg-red-100 text-red-800 border-red-200', 
                icon: XCircle, 
                label: 'Cancelled',
                description: 'Order was cancelled'
            },
        };

        return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    };

    const getOrderTypeConfig = (orderType: string) => {
        const types = {
            dine_in: { icon: '🏠', label: 'Dine In', color: 'bg-blue-50 text-blue-700' },
            takeaway: { icon: '🥡', label: 'Takeaway', color: 'bg-green-50 text-green-700' },
            delivery: { icon: '🚚', label: 'Delivery', color: 'bg-orange-50 text-orange-700' }
        };
        return types[orderType as keyof typeof types] || types.dine_in;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEstimatedTime = (status: string, created_at: string) => {
        const orderTime = new Date(created_at);
        const estimates = {
            preparing: 25,
            ready: 5,
            out_for_delivery: 30,
            delivered: 0
        };
        
        const estimateMinutes = estimates[status as keyof typeof estimates] || 15;
        if (estimateMinutes === 0) return 'Delivered';
        
        const estimatedTime = new Date(orderTime.getTime() + estimateMinutes * 60000);
        return `Est. ${estimatedTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        })}`;
    };

    const handleReorder = (order: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
        // Implement reorder logic
        console.log('Reordering:', order);
        // Add to cart functionality would go here
    }

    const handleContactRestaurant = () => {
        // Implement contact logic
        console.log('Contacting restaurant');
    }

    const handleRateOrder = (order: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
        // Implement rating logic
        console.log('Rating order:', order);
    }

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
                            <p className="text-green-100">Track your dining experiences and reorder favorites</p>
                        </div>
                        <div className="bg-green-700 bg-opacity-50 p-4 rounded-xl">
                            <Package size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="loading loading-spinner loading-lg text-green-600 mb-4"></div>
                    <p className="text-gray-600">Loading your orders...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Orders</h3>
                    <p className="text-red-600 mb-4">Unable to fetch your orders. Please try again later.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn bg-green-800 hover:bg-green-900 text-white"
                    >
                        Try Again
                    </button>
                </div>
            ) : !userOrders || userOrders.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Orders Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        You haven't placed any orders yet. Discover our delicious menu and start your culinary journey!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = '/menu'}
                            className="btn bg-green-800 hover:bg-green-900 text-white"
                        >
                            Explore Menu
                        </button>
                        <button
                            onClick={() => window.location.href = '/specials'}
                            className="btn btn-outline border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
                        >
                            View Today's Specials
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {userOrders.map((order: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
                        const statusConfig = getStatusConfig(order.status);
                        const orderTypeConfig = getOrderTypeConfig(order.order_type);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div key={order.order_id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                Order #{order.order_id}
                                            </h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                                                <StatusIcon size={14} className="mr-1" />
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${orderTypeConfig.color}`}>
                                                {orderTypeConfig.icon} {orderTypeConfig.label}
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                ${order.total_amount}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {statusConfig.description} • {getEstimatedTime(order.status, order.created_at)}
                                    </p>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Order Details */}
                                        <div className="lg:col-span-2">
                                            <div className="mb-4">
                                                <h4 className="text-2xl font-bold text-green-800 mb-2">
                                                    {order.menu_item_name}
                                                </h4>
                                                <p className="text-gray-700 font-medium flex items-center gap-2">
                                                    <Utensils size={16} />
                                                    {order.restaurant_name}
                                                </p>
                                            </div>

                                            {/* Order Timeline */}
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="text-center">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                                                        <span className="text-gray-600">Ordered</span>
                                                    </div>
                                                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                                                    <div className="text-center">
                                                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                                                            ['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].includes(order.status) 
                                                            ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}></div>
                                                        <span className="text-gray-600">Confirmed</span>
                                                    </div>
                                                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                                                    <div className="text-center">
                                                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                                                            ['preparing', 'ready', 'out_for_delivery', 'delivered'].includes(order.status) 
                                                            ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}></div>
                                                        <span className="text-gray-600">Preparing</span>
                                                    </div>
                                                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                                                    <div className="text-center">
                                                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                                                            ['ready', 'out_for_delivery', 'delivered'].includes(order.status) 
                                                            ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}></div>
                                                        <span className="text-gray-600">Ready</span>
                                                    </div>
                                                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                                                    <div className="text-center">
                                                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                                                            order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}></div>
                                                        <span className="text-gray-600">Delivered</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Information */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Order Date:</span>
                                                        <span className="font-medium">{formatDate(order.created_at)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Order Type:</span>
                                                        <span className="font-medium">{orderTypeConfig.label}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Quantity:</span>
                                                        <span className="font-medium">{order.quantity || 1}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Total Amount:</span>
                                                        <span className="font-bold text-green-600">${order.total_amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Panel */}
                                        <div className="space-y-3">
                                            {order.status === 'pending' && (
                                                <button 
                                                    onClick={() => console.log('Cancel order:', order.order_id)}
                                                    className="btn btn-outline btn-error w-full"
                                                >
                                                    <XCircle size={16} className="mr-2" />
                                                    Cancel Order
                                                </button>
                                            )}
                                            
                                            {order.status === 'delivered' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleReorder(order)}
                                                        className="btn bg-green-800 hover:bg-green-900 text-white w-full"
                                                    >
                                                        <Package size={16} className="mr-2" />
                                                        Order Again
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRateOrder(order)}
                                                        className="btn bg-amber-500 hover:bg-amber-600 text-white w-full"
                                                    >
                                                        <Star size={16} className="mr-2" />
                                                        Rate Order
                                                    </button>
                                                </>
                                            )}

                                            {(order.status === 'confirmed' || order.status === 'preparing') && (
                                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                    <Clock size={24} className="text-blue-600 mx-auto mb-2" />
                                                    <p className="text-sm text-blue-700 font-medium">Order in Progress</p>
                                                    <p className="text-xs text-blue-600">We're preparing your meal</p>
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleContactRestaurant}
                                                className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 w-full"
                                            >
                                                <MessageCircle size={16} className="mr-2" />
                                                Contact Restaurant
                                            </button>

                                            {order.order_type === 'delivery' && order.status === 'out_for_delivery' && (
                                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Truck size={16} className="text-orange-600" />
                                                        <span className="text-sm font-medium text-orange-800">Out for Delivery</span>
                                                    </div>
                                                    <p className="text-xs text-orange-700">
                                                        Your food is on the way! Track your delivery.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardLayout>
    );
}

export default Orders;