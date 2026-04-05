import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { User, Mail, Lock, ClipboardList } from 'lucide-react';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                alert('Profile updated successfully');
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* User Profile Info */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-8 rounded-sm shadow-xl shadow-gray-200/50 sticky top-24">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                            <div className="bg-electric/10 p-3 rounded-full text-electric">
                                <User size={24} />
                            </div>
                            <h2 className="text-2xl font-heading font-extrabold text-charcoal">My Profile</h2>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none transition-all"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none transition-all"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">New Password (optional)</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none transition-all"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loadingUpdateProfile}
                                className="w-full bg-charcoal text-white py-4 font-bold rounded-sm hover:bg-black transition-colors disabled:opacity-50"
                            >
                                {loadingUpdateProfile ? 'Updating...' : 'Update Settings'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-charcoal/5 p-3 rounded-full text-charcoal">
                            <ClipboardList size={24} />
                        </div>
                        <h2 className="text-3xl font-heading font-extrabold text-charcoal">Order History</h2>
                    </div>

                    {loadingOrders ? (
                        <div className="py-12 text-center text-gray-400">Loading orders...</div>
                    ) : errorOrders ? (
                        <div className="bg-red-50 text-red-500 p-4 rounded-sm border border-red-100 italic">
                            {errorOrders?.data?.message || 'Error loading orders'}
                        </div>
                    ) : orders?.length === 0 ? (
                        <div className="bg-gray-50 text-center py-24 rounded-sm border border-dashed border-gray-200">
                            <p className="text-gray-400 mb-4 font-medium">You haven't placed any orders yet.</p>
                            <a href="/shop" className="text-electric font-bold hover:underline">Start Shopping</a>
                        </div>
                    ) : (
                        <div className="bg-white rounded-sm border border-gray-100 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">ID</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Total</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Paid</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium font-mono text-gray-400">{order._id.substring(0, 8)}...</td>
                                                <td className="px-6 py-4 text-sm text-charcoal font-medium">{order.createdAt.substring(0, 10)}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-charcoal">${order.totalPrice.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {order.isPaid ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-tighter">
                                                            {order.paidAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-tighter">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    {order.isDelivered ? 'Delivered' : 'In Transit'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a href={`/order/${order._id}`} className="text-electric font-bold text-xs hover:underline uppercase tracking-widest">
                                                        Details
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
