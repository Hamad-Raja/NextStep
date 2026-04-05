import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice'
import { ArrowLeft, Save } from 'lucide-react'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [sizes, setSizes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { data: product, isLoading } = useGetProductDetailsQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImages(product.images?.join(', ') || '')
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
      setSizes(product.sizes?.join(', ') || '')
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await updateProduct({
        _id: productId,
        name,
        price: Number(price),
        images: images.split(',').map((img) => img.trim()),
        brand,
        category,
        countInStock: Number(countInStock),
        description,
        sizes: sizes
          ? sizes.split(',').map((s) => Number(s.trim())).filter(Boolean)
          : [],
      }).unwrap()
      setSuccess('Product updated successfully!')
      setTimeout(() => navigate('/admin/productlist'), 1500)
    } catch (err) {
      setError(err?.data?.message || 'Failed to update product')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-gray-400">
        Loading product...
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/admin/productlist')}
        className="flex items-center gap-2 text-gray-500 hover:text-charcoal mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Product List
      </button>

      <div className="bg-white rounded-sm border border-gray-100 shadow-xl shadow-gray-200/30 p-8">
        <h1 className="text-3xl font-heading font-extrabold text-charcoal mb-8 pb-4 border-b border-gray-100">
          Edit Product
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm font-medium mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm font-medium mb-6">
            {success}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Brand</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Count In Stock</label>
              <input
                type="number"
                required
                min="0"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sizes <span className="text-gray-400 font-normal">(comma-separated, e.g. 7, 8, 9)</span>
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="7, 7.5, 8, 8.5, 9"
                className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image URLs <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <textarea
              value={images}
              onChange={(e) => setImages(e.target.value)}
              rows={2}
              placeholder="https://..., https://..."
              className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-charcoal outline-none resize-none"
            />
          </div>

          {/* Preview */}
          {images && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Image Preview</label>
              <div className="flex gap-3 flex-wrap">
                {images.split(',').map((img, i) => (
                  <img
                    key={i}
                    src={img.trim()}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-sm border border-gray-200"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loadingUpdate}
              className="flex items-center gap-2 bg-charcoal text-white px-8 py-3 font-bold rounded-sm hover:bg-black transition-colors disabled:opacity-60"
            >
              <Save size={18} />
              {loadingUpdate ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEditScreen
