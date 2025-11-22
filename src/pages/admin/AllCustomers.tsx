import React, { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Users, Search, Filter, Eye, Edit, Trash2, Mail, Phone, Calendar, Shield,  } from 'lucide-react'
import { userApi } from '../../features/api/api/UserApi.ts'

const AllCustomers: React.FC = () => {
    //RTK Query Hook
    const { data: allCustomers } = userApi.useGetAllUsersQuery()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('all')

    console.log("🚀 ~ AllMenuItems ~ allMenuItem:", allCustomers)

    // Filter customers based on search and status
    const filteredCustomers = allCustomers?.filter(customer => {
        const matchesSearch = customer.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
        return matchesSearch && matchesStatus
    }) || []

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Active' },
            inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Inactive' },
            pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' }
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
                {config.label}
            </span>
        )
    }

    return (
        <AdminDashboardLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">Customer Management</h1>
                                <p className="text-blue-100 text-lg opacity-90 mt-2">
                                    Manage and monitor your restaurant customers
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white bg-opacity-15 px-4 py-2 rounded-full backdrop-blur-sm">
                                <Shield className="w-4 h-4" />
                                <span>{allCustomers?.length || 0} Total Customers</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-8 top-6 opacity-10">
                        <Users size={140} />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Customers', value: allCustomers?.length || 0, color: 'blue', trend: '+12%' },
                    { label: 'Active Today', value: '24', color: 'emerald', trend: '+5' },
                    { label: 'New This Week', value: '18', color: 'orange', trend: '+8' },
                    { label: 'Avg. Order Value', value: '$45.60', color: 'purple', trend: '+2.4%' }
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition-all duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{stat.trend} from last week</p>
                            </div>
                            <div className={`p-3 rounded-xl ${
                                stat.color === 'blue' ? 'bg-blue-50' :
                                stat.color === 'emerald' ? 'bg-emerald-50' :
                                stat.color === 'orange' ? 'bg-orange-50' : 'bg-purple-50'
                            }`}>
                                <Users className={`w-6 h-6 ${
                                    stat.color === 'blue' ? 'text-blue-600' :
                                    stat.color === 'emerald' ? 'text-emerald-600' :
                                    stat.color === 'orange' ? 'text-orange-600' : 'text-purple-600'
                                }`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search customers by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-10 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <select 
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="select select-bordered focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none">
                        <Filter className="w-4 h-4 mr-2" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Directory</h3>
                    <p className="text-gray-500 text-sm mt-1">
                        Showing {filteredCustomers.length} of {allCustomers?.length || 0} customers
                    </p>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4">Customer</th>
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4">Contact</th>
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4">Date Joined</th>
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4">Status</th>
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4">User Type</th>
                                <th className="bg-gray-50 text-gray-600 font-semibold py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.user_id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                                    {/* Customer Info */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {customer.first_name?.[0]}{customer.last_name?.[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {customer.first_name} {customer.last_name}
                                                </div>
                                                <div className="text-sm text-gray-500">ID: #{customer.user_id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Contact Info */}
                                    <td className="py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700">{customer.email}</span>
                                            </div>
                                            {customer.phone_number && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-700">{customer.phone_number}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    
                                    {/* Date Joined */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {customer.created_at ? formatDate(customer.created_at) : 'N/A'}
                                        </div>
                                    </td>
                                    
                                    {/* Status */}
                                    <td className="py-4">
                                        {getStatusBadge(customer.status || 'active')}
                                    </td>
                                    
                                    {/* User Type */}
                                    <td className="py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            <Shield className="w-3 h-3 mr-1" />
                                            {customer.user_type || 'Customer'}
                                        </span>
                                    </td>
                                    
                                    {/* Actions */}
                                    <td className="py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none">
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                            <button className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {filteredCustomers.length} customers
                        </div>
                        <div className="join">
                            <button className="join-item btn btn-sm">1</button>
                            <button className="join-item btn btn-sm btn-active">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">4</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AllCustomers