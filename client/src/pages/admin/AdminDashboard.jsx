import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { Users, ShoppingBag, CreditCard, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const AdminDashboard = () => {
    const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
    const { data: products, isLoading: loadingProducts } = useGetProductsQuery();

    const stats = [
        { 
            name: 'Total Sales', 
            value: orders?.length ? `$${orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(2)}` : '$0.00', 
            icon: DollarSign, 
            color: 'bg-green-50 text-green-600',
            trend: 'up'
        },
        { 
            name: 'Total Orders', 
            value: orders?.length || '0', 
            icon: ShoppingBag, 
            color: 'bg-blue-50 text-blue-600',
            trend: 'up'
        },
        { 
            name: 'Total Products', 
            value: products?.length || '0', 
            icon: CreditCard, 
            color: 'bg-indigo-50 text-indigo-600',
            trend: 'none'
        },
        { 
            name: 'Active Customers', 
            value: orders?.length ? new Set(orders.map(o => o.user._id)).size : '0', 
            icon: Users, 
            color: 'bg-orange-50 text-orange-600',
            trend: 'up'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-heading font-extrabold text-charcoal mb-8 pb-4 border-b border-gray-100">Store Performance</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-sm shadow-xl shadow-gray-200/50 border border-gray-100 transition-transform hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.color} p-3 rounded-xl`}>
                                <stat.icon size={24} />
                            </div>
                            {stat.trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
                            {stat.trend === 'down' && <TrendingDown size={16} className="text-red-500" />}
                        </div>
                        <p className="text-gray-500 font-medium text-sm mb-1">{stat.name}</p>
                        <h3 className="text-3xl font-heading font-extrabold text-charcoal tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-heading font-bold text-charcoal mb-6 border-b border-gray-100 pb-4">Recent Sales</h2>
                    {loadingOrders ? (
                        <p className="text-gray-400 italic">Syncing transactions...</p>
                    ) : orders?.length === 0 ? (
                        <p className="text-gray-400 italic">No sales recorded yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map(o => (
                                <div key={o._id} className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="font-bold text-charcoal text-sm">{o.user?.name || 'Anonymous'}</p>
                                        <p className="text-xs text-gray-400 font-mono">{o._id.substring(0, 10)}</p>
                                    </div>
                                    <p className="font-bold text-charcoal font-heading">${o.totalPrice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-charcoal p-8 rounded-sm shadow-2xl text-offwhite shadow-charcoal/30 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-4">Inventory Alert</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Keep your collection fresh. Review your current stock levels and update your pricing to stay competitive in the luxury footwear market.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="/admin/productlist" className="bg-white text-charcoal px-6 py-3 font-bold rounded-sm hover:bg-gray-200 transition-colors">
                            Manage Inventory
                        </a>
                        <a href="/admin/orderlist" className="bg-transparent border border-gray-600 px-6 py-3 font-bold rounded-sm hover:border-white transition-colors">
                            Review Orders
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
