import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { User, Edit, Save, X, Mail, Phone,  Shield, Check, Utensils,  Heart, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { userApi } from '../../features/api/api/UserApi'
import { toast, Toaster } from 'sonner'

const UserProfile: React.FC = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.authSlice)
    const [updateUserDetails, { isLoading: isUpdating }] = userApi.useUpdateUsersDetailsMutation()
    const { data: userData, isLoading: isLoadingUserData } = userApi.useGetUserByIdQuery(
        (user?.user_id!),
        { skip: !isAuthenticated })

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        dietary_preferences: '',
        favorite_cuisine: '',
        delivery_address: ''
    })
    const [originalData, setOriginalData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        dietary_preferences: '',
        favorite_cuisine: '',
        delivery_address: ''
    })

    // Initialize form data when user data is available
    useEffect(() => {
        if (userData) {
            const userInfo = {
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone_number: userData.phone_number || '',
                dietary_preferences: userData.dietary_preferences || 'None specified',
                favorite_cuisine: userData.favorite_cuisine || 'Not specified',
                delivery_address: userData.delivery_address || 'No address saved'
            }
            setFormData(userInfo)
            setOriginalData(userInfo)
        }
    }, [userData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = async () => {
        if (!user?.user_id) return

        const loadingToastId = toast.loading("Updating your profile...")

        try {
            await updateUserDetails({
                user_id: user.user_id,
                ...formData
            }).unwrap()

            setOriginalData(formData)
            setIsEditing(false)
            toast.success("Profile updated successfully!", { id: loadingToastId })
        } catch (error: any) {
            console.error('Profile update failed:', error)
            toast.error('Failed to update profile. Please try again.', { id: loadingToastId })
        }
    }

    const handleCancel = () => {
        setFormData(originalData)
        setIsEditing(false)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)

    // Dietary preferences options
    const dietaryOptions = [
        'None',
        'Vegetarian',
        'Vegan',
        'Gluten-Free',
        'Dairy-Free',
        'Keto',
        'Paleo',
        'Halal',
        'Kosher'
    ]

    const cuisineOptions = [
        'Italian',
        'Mexican',
        'Asian',
        'Indian',
        'American',
        'Mediterranean',
        'French',
        'Thai',
        'Japanese',
        'Chinese'
    ]

    return (
        <DashboardLayout>
            <Toaster position="top-right" richColors />
            
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Your Dining Profile</h1>
                            <p className="text-green-100">Manage your preferences and dining information</p>
                        </div>
                        <div className="bg-green-700 bg-opacity-50 p-4 rounded-xl">
                            <Utensils size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {!isAuthenticated || !user ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h3>
                    <p className="text-red-600 mb-4">Please sign in to view your profile.</p>
                    <button className="btn bg-green-800 hover:bg-green-900 text-white">
                        Sign In
                    </button>
                </div>
            ) : isLoadingUserData ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="loading loading-spinner loading-lg text-green-600 mb-4"></div>
                    <p className="text-gray-600">Loading your dining profile...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Profile Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center sticky top-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                <User className="text-green-600" size={48} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-1">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p className="text-gray-600 mb-2">{user.email}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 font-medium mb-4">
                                <Shield size={14} className="mr-1" />
                                {user.user_type?.toUpperCase() || 'CUSTOMER'}
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-3 mt-6">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Member Since</span>
                                    <span className="text-sm font-semibold">
                                        {userData?.created_at ? formatDate(userData.created_at) : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Loyalty Tier</span>
                                    <span className="text-sm font-semibold text-amber-600">Gold Member</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn bg-green-800 hover:bg-green-900 text-white border-none"
                                    >
                                        <Edit size={16} className="mr-2" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancel}
                                            className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            <X size={16} className="mr-2" />
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={!hasChanges || isUpdating}
                                            className="btn bg-green-800 hover:bg-green-900 text-white"
                                        >
                                            {isUpdating ? (
                                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                            ) : (
                                                <Save size={16} className="mr-2" />
                                            )}
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                className="input input-bordered w-full focus:border-green-500 focus:ring-green-500"
                                                placeholder="Enter your first name"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {user.first_name || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                className="input input-bordered w-full focus:border-green-500 focus:ring-green-500"
                                                placeholder="Enter your last name"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.last_name || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Mail size={16} className="inline mr-2" />
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="input input-bordered w-full focus:border-green-500 focus:ring-green-500"
                                                placeholder="Enter your email"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.email || 'Not provided'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Phone size={16} className="inline mr-2" />
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                className="input input-bordered w-full focus:border-green-500 focus:ring-green-500"
                                                placeholder="Enter your phone number"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.phone_number || 'Not provided'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Restaurant Preferences */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Heart size={16} className="inline mr-2" />
                                            Favorite Cuisine
                                        </label>
                                        {isEditing ? (
                                            <select
                                                name="favorite_cuisine"
                                                value={formData.favorite_cuisine}
                                                onChange={handleInputChange}
                                                className="select select-bordered w-full focus:border-green-500 focus:ring-green-500"
                                            >
                                                {cuisineOptions.map(cuisine => (
                                                    <option key={cuisine} value={cuisine}>
                                                        {cuisine}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.favorite_cuisine || 'Not specified'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Utensils size={16} className="inline mr-2" />
                                            Dietary Preferences
                                        </label>
                                        {isEditing ? (
                                            <select
                                                name="dietary_preferences"
                                                value={formData.dietary_preferences}
                                                onChange={handleInputChange}
                                                className="select select-bordered w-full focus:border-green-500 focus:ring-green-500"
                                            >
                                                {dietaryOptions.map(pref => (
                                                    <option key={pref} value={pref}>
                                                        {pref}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.dietary_preferences || 'None specified'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MapPin size={16} className="inline mr-2" />
                                            Delivery Address
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="delivery_address"
                                                value={formData.delivery_address}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="textarea textarea-bordered w-full focus:border-green-500 focus:ring-green-500"
                                                placeholder="Enter your delivery address"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                {userData?.delivery_address || 'No address saved'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Status Card */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                <Check className="mr-2" size={20} />
                                Dining Account Status
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center border border-green-100">
                                    <div className="text-2xl font-bold text-green-600 mb-2">✓</div>
                                    <p className="text-sm font-medium text-gray-700">Email Verified</p>
                                    <p className="text-xs text-gray-500">Ready for orders</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-green-100">
                                    <div className="text-2xl font-bold text-amber-600 mb-2">Gold</div>
                                    <p className="text-sm font-medium text-gray-700">Loyalty Tier</p>
                                    <p className="text-xs text-gray-500">Premium benefits</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-green-100">
                                    <div className="text-2xl font-bold text-green-600 mb-2">Active</div>
                                    <p className="text-sm font-medium text-gray-700">Account Status</p>
                                    <p className="text-xs text-gray-500">All features available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}

export default UserProfile