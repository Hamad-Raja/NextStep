import React from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { ClipboardList, Search, Eye } from 'lucide-react';

const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const deliverHandler = async (id) => {
    try {
      await deliverOrder(id);
      refetch();
      alert('Order status updated');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 text-charcoal">
          <div className="bg-charcoal text-offwhite p-3 rounded-full">
            <ClipboardList size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-extrabold tracking-tight">Order Management</h1>
            <p className="text-gray-400 text-sm mt-1">Track and fulfillment of customer orders</p>
          </div>
        </div>
        <div className="relative hidden md:block">
            <input 
                type="text" 
                placeholder="Find order #..." 
                className="pl-10 pr-4 py-3 border border-gray-100 bg-gray-50/50 rounded-sm focus:bg-white focus:border-gray-200 outline-none transition-all w-64 text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 text-center text-gray-400">Loading order flow...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-6 rounded-sm border border-red-100 italic">
            {error?.data?.message || 'Error loading orders'}
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">User</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Paid</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Delivered</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-400 font-medium">#{order._id.substring(18)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">{order.user?.name || 'Deleted User'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-electric">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      {order.isPaid ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold bg-green-50 text-green-700 uppercase tracking-tighter border border-green-100">
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold bg-red-50 text-red-700 uppercase tracking-tighter border border-red-100">
                           Awaiting
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {order.isDelivered ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 uppercase tracking-tighter border border-blue-100">
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        <button 
                            onClick={() => deliverHandler(order._id)}
                            disabled={loadingDeliver}
                            className="text-electric font-bold text-xs hover:underline uppercase tracking-widest disabled:opacity-50"
                        >
                            Mark Delivered
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/order/${order._id}`} className="text-gray-400 hover:text-charcoal p-2 inline-block transition-colors">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
