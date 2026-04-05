import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'
import { CheckCircle, Clock, Package, Truck, MapPin, CreditCard } from 'lucide-react'

const OrderDetail = () => {
  const { id: orderId } = useParams()
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="animate-pulse text-gray-400 font-medium">Loading your order...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-sm">
          {error?.data?.message || 'Order not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-charcoal text-white p-3 rounded-full">
          <Package size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-charcoal">Order Details</h1>
          <p className="text-gray-400 text-sm font-mono">#{order._id}</p>
        </div>
      </div>

      {/* Status Banner */}
      <div
        className={`flex items-center gap-3 p-4 rounded-sm mb-8 ${
          order.isDelivered
            ? 'bg-green-50 border border-green-200 text-green-700'
            : order.isPaid
            ? 'bg-blue-50 border border-blue-200 text-blue-700'
            : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
        }`}
      >
        {order.isDelivered ? (
          <CheckCircle size={20} />
        ) : order.isPaid ? (
          <Truck size={20} />
        ) : (
          <Clock size={20} />
        )}
        <span className="font-bold">
          {order.isDelivered
            ? `Delivered on ${order.deliveredAt?.substring(0, 10)}`
            : order.isPaid
            ? 'Paid — Processing your order'
            : 'Awaiting Payment'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-charcoal font-bold">
              <MapPin size={18} /> Shipping Address
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="font-bold text-charcoal block">{order.user?.name}</span>
              {order.shippingAddress?.address}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
              {order.shippingAddress?.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-charcoal font-bold">
              <CreditCard size={18} /> Payment
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Method:</span> {order.paymentMethod}
            </p>
            <p className="text-sm mt-2">
              {order.isPaid ? (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  <CheckCircle size={12} /> Paid on {order.paidAt?.substring(0, 10)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                  Not Paid
                </span>
              )}
            </p>
          </div>

          {/* Items */}
          <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
            <h3 className="font-bold text-charcoal mb-4 flex items-center gap-2">
              <Package size={18} /> Order Items
            </h3>
            <div className="divide-y divide-gray-100">
              {order.orderItems?.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-4">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm bg-gray-100"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="font-bold text-charcoal hover:text-electric transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">
                      {item.qty} × ${item.price.toFixed(2)}
                    </p>
                    <p className="font-bold text-charcoal">
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-charcoal mb-4 text-lg">Price Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>${order.itemsPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {Number(order.shippingPrice) === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    `$${order.shippingPrice?.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.taxPrice?.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-charcoal text-lg">
                <span>Total</span>
                <span>${order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/profile"
              className="mt-6 block text-center text-sm text-electric font-semibold hover:underline"
            >
              ← Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
