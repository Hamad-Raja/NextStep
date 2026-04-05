import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ArrowLeft, Star, Heart } from 'lucide-react'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'

const ProductDetail = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [mainImage, setMainImage] = useState('')

  useEffect(() => {
    if (product) {
        setMainImage(product.images[0]);
    }
  }, [product]);

  const addToCartHandler = () => {
    if (!selectedSize && product.sizes?.length > 0) {
        alert('Please select a size');
        return;
    }
    dispatch(addToCart({ ...product, qty, size: selectedSize }));
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="text-gray-500 hover:text-charcoal inline-flex items-center gap-2 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Collection
      </Link>

      {isLoading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
      <div className="flex flex-col lg:flex-row gap-16 animate-fade-in-up">
        
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 rounded-sm mb-4 overflow-hidden aspect-w-4 aspect-h-4 lg:aspect-h-5 shadow-2xl shadow-gray-200/50">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-[500px] object-cover object-center transition-all duration-700"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`border-2 overflow-hidden rounded-sm transition-all ${mainImage === img ? 'border-charcoal' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} alt="" className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-2 flex justify-between items-center">
            <p className="text-electric font-semibold uppercase tracking-widest text-sm">{product.brand}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-charcoal">{product.rating}</span>
              <span>({product.numReviews} Reviews)</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-heading font-extrabold text-charcoal mb-4 uppercase tracking-tighter">{product.name}</h1>
          <p className="text-2xl text-gray-600 mb-8 border-b border-gray-200 pb-8 font-heading">${product.price?.toFixed(2)}</p>

          <p className="text-gray-500 leading-relaxed mb-8 font-body">
            {product.description}
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-bold text-charcoal">Select Size</h3>
              <a href="#" className="text-electric text-sm hover:underline font-bold">Size Guide</a>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes?.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-sm font-bold transition-all rounded-sm ${selectedSize === size ? 'bg-charcoal text-white border-charcoal scale-105 shadow-lg shadow-charcoal/30' : 'border-gray-300 bg-white text-charcoal hover:border-charcoal'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
             <h3 className="font-heading font-bold text-charcoal mb-4">Quantity</h3>
             <select 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-charcoal outline-none bg-white font-bold"
             >
                {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                ))}
             </select>
          </div>

          <div className="flex gap-4">
            <button 
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="flex-1 bg-charcoal text-white py-5 font-bold text-lg rounded-sm hover:-translate-y-1 transition-transform transform shadow-xl shadow-charcoal/20 disabled:opacity-50 disabled:transform-none"
            >
              Add to Cart
            </button>
            <button className="p-4 border border-gray-300 rounded-sm hover:border-charcoal text-gray-400 hover:text-red-500 transition-colors shadow-sm">
              <Heart size={24} />
            </button>
          </div>

          {product.countInStock > 0 ? (
            <p className="text-green-600 text-sm mt-6 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                In Stock and ready to ship
            </p>
          ) : (
            <p className="text-red-500 text-sm mt-6 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Currently Out of Stock
            </p>
          )}

        </div>
      </div>
      )}
    </div>
  )
}

export default ProductDetail
