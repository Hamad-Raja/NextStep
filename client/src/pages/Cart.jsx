import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Trash2, ShoppingBag } from 'lucide-react'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const removeFromCartHandler = (id, size) => {
    dispatch(removeFromCart({ id, size }))
  }

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout')
  }

  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <h1 className="text-4xl font-heading font-extrabold text-charcoal mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-sm border border-dashed border-gray-200">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl text-gray-400 mb-4 font-heading">Your cart is empty</h2>
          <Link to="/shop" className="text-electric font-bold hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="border-b border-gray-200 pb-4 mb-6 hidden sm:flex justify-between text-sm text-gray-500 uppercase tracking-widest">
              <span className="w-1/2">Product</span>
              <span className="w-1/4 text-center">Quantity</span>
              <span className="w-1/4 text-right">Total</span>
            </div>

            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex flex-col sm:flex-row border-b border-gray-200 py-6 items-start sm:items-center"
              >
                <div className="w-full sm:w-1/2 flex gap-4 mb-4 sm:mb-0">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="font-heading font-bold text-lg text-charcoal hover:text-electric transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>
                    )}
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                    <button
                      onClick={() => removeFromCartHandler(item._id, item.size)}
                      className="text-red-400 hover:text-red-600 text-sm mt-3 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-1/4 flex justify-between sm:justify-center items-center mb-4 sm:mb-0">
                  <span className="sm:hidden text-gray-500 text-sm">Quantity:</span>
                  <div className="flex border border-gray-300 rounded-sm">
                    <button
                      onClick={() => item.qty > 1 && addToCartHandler(item, item.qty - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">{item.qty}</span>
                    <button
                      onClick={() =>
                        item.qty < item.countInStock && addToCartHandler(item, item.qty + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-1/4 flex justify-between sm:justify-end items-center font-bold text-charcoal">
                  <span className="sm:hidden text-gray-500 text-sm font-normal">Total:</span>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-sm sticky top-24">
              <h2 className="text-xl font-heading font-bold border-b border-gray-200 pb-4 mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">
                  {subtotal > 100 ? 'FREE' : '$10.00'}
                </span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Tax (15%)</span>
                <span>${(subtotal * 0.15).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between font-bold text-xl text-charcoal">
                <span>Total</span>
                <span>
                  ${(subtotal + (subtotal > 100 ? 0 : 10) + subtotal * 0.15).toFixed(2)}
                </span>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full block text-center bg-charcoal text-white py-4 mt-8 font-bold hover:bg-gray-800 transition-colors rounded-sm"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="w-full block text-center text-electric font-semibold hover:underline mt-4 text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
