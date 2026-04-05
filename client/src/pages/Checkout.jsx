import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Check } from 'lucide-react'
import { saveShippingAddress, savePaymentMethod, clearCartItems } from '../slices/cartSlice'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'

const Checkout = () => {
  const [step, setStep] = useState(1)

  // Shipping form state
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  // Payment
  const [selectedPayment, setSelectedPayment] = useState('Stripe')

  const [orderError, setOrderError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart
  const { userInfo } = useSelector((state) => state.auth)

  const [createOrder, { isLoading: loadingCreateOrder }] = useCreateOrderMutation()

  // Redirect to login if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout')
    }
  }, [userInfo, navigate])

  // Pre-fill shipping from Redux if available
  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address || '')
      setCity(shippingAddress.city || '')
      setPostalCode(shippingAddress.postalCode || '')
      setCountry(shippingAddress.country || '')
    }
    if (paymentMethod) {
      setSelectedPayment(paymentMethod)
    }
  }, [shippingAddress, paymentMethod])

  const saveShippingHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    setStep(2)
  }

  const savePaymentHandler = () => {
    dispatch(savePaymentMethod(selectedPayment))
    setStep(3)
  }

  const placeOrderHandler = async () => {
    setOrderError('')
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (err) {
      setOrderError(err?.data?.message || 'Failed to place order. Please try again.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-heading font-extrabold text-charcoal mb-8 text-center">
        Checkout
      </h1>

      {/* Progress Bar */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center w-full max-w-lg">
          {[
            { label: 'Shipping', num: 1 },
            { label: 'Payment', num: 2 },
            { label: 'Review', num: 3 },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step >= s.num ? 'bg-charcoal text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span className="text-xs mt-2 font-medium text-gray-500">{s.label}</span>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-1 mx-2 ${step > s.num ? 'bg-charcoal' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-sm shadow-xl shadow-gray-200/50">
        {/* Step 1: Shipping */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-heading font-bold mb-6">Shipping Address</h2>
            <form onSubmit={saveShippingHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="USA"
                    className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-charcoal text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors rounded-sm"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-heading font-bold mb-6">Payment Method</h2>
            <div className="space-y-4">
              {['Stripe', 'PayPal', 'Cash on Delivery'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${
                    selectedPayment === method
                      ? 'border-charcoal bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                    className="accent-charcoal mr-4"
                  />
                  <span className="font-medium">{method}</span>
                </label>
              ))}
            </div>
            <div className="pt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-500 hover:text-charcoal font-medium"
              >
                ← Back to Shipping
              </button>
              <button
                onClick={savePaymentHandler}
                className="bg-charcoal text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors rounded-sm"
              >
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-heading font-bold mb-6">Review Your Order</h2>

            {orderError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm font-medium mb-6">
                {orderError}
              </div>
            )}

            <div className="border border-gray-200 rounded-sm p-6 mb-4">
              <h3 className="font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">Shipping</h3>
              <p className="text-gray-600 text-sm">
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{' '}
                {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
              </p>
            </div>

            <div className="border border-gray-200 rounded-sm p-6 mb-4">
              <h3 className="font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">Payment</h3>
              <p className="text-gray-600 text-sm">{cart.paymentMethod}</p>
            </div>

            <div className="border border-gray-200 rounded-sm p-6 mb-4">
              <h3 className="font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">Order Items</h3>
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex justify-between items-center text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                    <span>
                      {item.qty}x {item.name}
                      {item.size ? ` (Size ${item.size})` : ''}
                    </span>
                  </div>
                  <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{Number(cart.shippingPrice) === 0 ? 'FREE' : `$${cart.shippingPrice}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.taxPrice}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-charcoal pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${cart.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="text-gray-500 hover:text-charcoal font-medium"
              >
                ← Back to Payment
              </button>
              <button
                onClick={placeOrderHandler}
                disabled={loadingCreateOrder || cartItems.length === 0}
                className="bg-electric text-white px-10 py-4 font-bold hover:bg-blue-600 transition-colors rounded-sm shadow-xl shadow-electric/20 disabled:opacity-60"
              >
                {loadingCreateOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
