import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { menuItemApi } from '../features/api/api/MenuItemApi'
import { orderApi } from '../features/api/api/OrderApi'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { ShoppingCart } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router'

const Meals: React.FC = () => {
    // Get auth state from Redux store
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice)
    const navigate = useNavigate()
    const user_id = user?.user_id

    // RTK Query hooks
    const { data: menuItems, error, isLoading } = menuItemApi.useGetAllMenuItemsQuery();
    const [createNewOrder, { isLoading: isCreateOrderLoading }] = orderApi.useAddNewOrderMutation()

    // State management
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('name')
    const [showAvailableOnly, setShowAvailableOnly] = useState(false)
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState<any>(null)// eslint-disable-line @typescript-eslint/no-explicit-any
    const [orderType, setOrderType] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in')

    // SAFE: Get unique categories with array fallback
    const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];
    const categories = ['All', ...new Set(safeMenuItems.map(meal => meal?.category).filter(Boolean))]

    // SAFE: Filter and sort meals
    const filteredMeals = safeMenuItems.filter(meal => {
        if (!meal) return false;
        
        const matchesSearch = meal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal.description?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory
        const matchesAvailability = !showAvailableOnly || meal.available

        return matchesSearch && matchesCategory && matchesAvailability
    })
    .sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a.price || 0) - (b.price || 0)
            case 'price-high':
                return (b.price || 0) - (a.price || 0)
            case 'rating':
                return (b.rating || 0) - (a.rating || 0)
            default:
                return (a.name || '').localeCompare(b.name || '')
        }
    })

    // Open order modal
    const openOrderModal = (meal: any) => {// eslint-disable-line @typescript-eslint/no-explicit-any
        if (!isAuthenticated || !user_id) {
            toast.error('Please sign in to place an order');
            return;
        }

        if (!meal.is_available || meal.quantity < 1) {
            toast.error('This item is currently unavailable');
            return;
        }

        setSelectedMeal(meal);
        setIsOrderModalOpen(true);
    };

    // Create order with selected type
    const handleCreateOrder = async () => {
        if (!selectedMeal) return;

        const loadingToastId = toast.loading("Creating order...");
        try {
            const orderData = {
                restaurant_id: selectedMeal.restaurant_id,
                customer_id: user_id!,
                menu_item_id: selectedMeal.menu_item_id,
                total_amount: selectedMeal.price,
                order_type: orderType
            };

            const response = await createNewOrder(orderData).unwrap();
            toast.success(response.message, { id: loadingToastId });

            // Close modal and reset
            setIsOrderModalOpen(false);
            setSelectedMeal(null);
            setOrderType('dine_in');

            navigate('/dashboard/my-orders');

        } catch (error: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Order failed:', error);
            toast.error('Failed to place order. Please try again.', { id: loadingToastId });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Toaster position="top-right" richColors />

            {/* Hero Section - Kenyan Theme */}
            <div className="bg-amber-800 text-white pt-16 pb-8 px-8 text-center">
                <h1 className="text-5xl mb-4 font-bold">
                    🍛 Authentic Kenyan Delicacies
                </h1>
                <p className="text-xl max-w-2xl mx-auto leading-relaxed opacity-90">
                    Discover our carefully crafted menu featuring traditional Kenyan flavors and fresh local ingredients.
                </p>
            </div>

            {/* Search and Filters - Kenyan Theme */}
            <div className="bg-orange-50 p-8 border-b border-amber-200">
                <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-center">
                    {/* Search Bar */}
                    <div className="flex-1 min-w-64 max-w-96">
                        <input
                            type="text"
                            placeholder="🔍 Search Kenyan dishes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-amber-300 rounded-full text-black outline-none transition-colors duration-300 focus:border-amber-800"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 border-2 border-amber-300 rounded-lg text-black bg-white cursor-pointer outline-none focus:border-amber-800"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                📂 {category}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border-2 border-amber-300 rounded-lg text-black bg-white cursor-pointer outline-none focus:border-amber-800"
                    >
                        <option value="name">📝 Sort by Name</option>
                        <option value="price-low">💰 Price: Low to High</option>
                        <option value="price-high">💎 Price: High to Low</option>
                        <option value="rating">⭐ Rating</option>
                    </select>

                    {/* Available Only Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer text-base">
                        <input
                            type="checkbox"
                            checked={showAvailableOnly}
                            onChange={(e) => setShowAvailableOnly(e.target.checked)}
                            className="scale-125"
                        />
                        ✅ Available Only
                    </label>
                </div>
            </div>

            {/* Results Count */}
            <div className="py-4 px-8 bg-white text-center border-b border-amber-200">
                <p className="text-lg text-gray-500 m-0">
                    Found {filteredMeals.length} delicious Kenyan dish{filteredMeals.length !== 1 ? 'es' : ''}
                    {searchTerm && ` matching "${searchTerm}"`}
                </p>
            </div>

            {/* Meals Grid - Kenyan Theme */}
            <div className="flex-1 p-8 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="col-span-full flex justify-center items-center py-16">
                            <span className="loading loading-spinner loading-lg text-amber-600"></span>
                            <span className="ml-3 text-gray-600">Loading Kenyan delicacies...</span>
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center py-16 text-red-500">
                            Error loading meals. Please try again later.
                        </div>
                    ) : filteredMeals.length === 0 ? (
                        <div className="col-span-full text-center py-16 text-gray-500">
                            No Kenyan dishes found. Try adjusting your search.
                        </div>
                    ) : (
                        filteredMeals.map(meal => (
                            <div
                                key={meal.menu_item_id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-200 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={meal.menuitem_image_url}
                                        alt={meal.name}
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* Availability Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${meal.available ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                        {meal.available ? '✅ Available' : '❌ Sold Out'}
                                    </div>

                                    {/* Quantity Badge */}
                                    <div className={`absolute top-14 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${meal.quantity && meal.quantity <= 5 ? 'bg-orange-500' : 'bg-amber-600'
                                        }`}>
                                        📦 {meal.quantity || 0} left
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-amber-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {meal.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl text-amber-800 mb-2 font-bold">
                                        {meal.name}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        {meal.description}
                                    </p>

                                    {/* Low Stock Warning */}
                                    {meal.quantity && meal.quantity <= 5 && meal.quantity > 0 && (
                                        <div className="bg-yellow-50 text-yellow-800 p-2 rounded-md text-xs mb-4 border border-yellow-200 flex items-center gap-2">
                                            ⚠️ <strong>Popular!</strong> Only {meal.quantity} left!
                                        </div>
                                    )}

                                    {/* Rating and Prep Time */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-1 text-sm">
                                            <span>⭐</span>
                                            <span className="font-bold">{meal.rating || '4.5'}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <span>⏱️</span>
                                            <span>{meal.preparation_time || '20 mins'}</span>
                                        </div>
                                    </div>

                                    {/* Price and Order Button */}
                                    <div className="flex justify-between items-center">
                                        <div className="text-2xl font-bold text-amber-800">
                                            ${(meal.price || 0).toFixed(2)}
                                        </div>

                                        <button
                                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${meal.available && meal.quantity >= 1
                                                ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer hover:-translate-y-1 hover:shadow-lg'
                                                : 'bg-gray-500 text-white cursor-not-allowed'
                                                }`}
                                            onClick={() => openOrderModal(meal)}
                                            disabled={!meal.available || meal.quantity < 1 || isCreateOrderLoading}
                                        >
                                            {isCreateOrderLoading ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                <>
                                                    <ShoppingCart size={16} />
                                                    <span className="sm:inline">{isAuthenticated ? "Order Now" : "Sign In"}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Type Modal - Kenyan Theme */}
                {isOrderModalOpen && selectedMeal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-sm">
                            <h3 className="font-bold text-lg mb-4">Select Order Type</h3>

                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={selectedMeal.image_url}
                                    alt={selectedMeal.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{selectedMeal.name}</p>
                                    <p className="text-amber-600 font-bold">${selectedMeal.price}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {[
                                    { value: 'dine_in', label: '🏠 Dine In', desc: 'Eat at restaurant' },
                                    { value: 'takeaway', label: '🥡 Takeaway', desc: 'Pick up order' },
                                    { value: 'delivery', label: '🚚 Delivery', desc: 'Delivered to you' }
                                ].map((option) => (
                                    <label key={option.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="orderType"
                                            value={option.value}
                                            checked={orderType === option.value}
                                            onChange={(e) => setOrderType(e.target.value as typeof orderType)}
                                            className="radio radio-warning"
                                        />
                                        <div>
                                            <div className="font-medium">{option.label}</div>
                                            <div className="text-sm text-gray-500">{option.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="modal-action">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setIsOrderModalOpen(false);
                                        setSelectedMeal(null);
                                        setOrderType('dine_in');
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn bg-amber-600 hover:bg-amber-700 text-white"
                                    onClick={handleCreateOrder}
                                    disabled={isCreateOrderLoading}
                                >
                                    {isCreateOrderLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Meals