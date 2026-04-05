import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Plus, Edit, Trash2, Box, Package } from 'lucide-react';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        alert('Product deleted');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new sample product?')) {
      try {
        await createProduct();
        refetch();
        alert('Product created');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-charcoal text-white p-3 rounded-full">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-extrabold text-charcoal">Products</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your inventory and pricing</p>
          </div>
        </div>
        <button 
          onClick={createProductHandler}
          disabled={loadingCreate}
          className="flex items-center gap-2 bg-electric text-white px-6 py-3 font-bold hover:bg-blue-600 transition-colors rounded-sm shadow-lg shadow-electric/20 disabled:opacity-50"
        >
          <Plus size={20} /> Create Product
        </button>
      </div>

      {isLoading ? (
        <div className="py-24 text-center text-gray-400">Loading products...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-6 rounded-sm border border-red-100 italic">
            {error?.data?.message || 'Error loading products'}
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Brand</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Stock</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">{product._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-bold text-charcoal">{product.name}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 lowercase first-letter:uppercase">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">{product.brand}</td>
                    <td className="px-6 py-4 text-sm">
                        <span className={`font-bold ${product.countInStock > 5 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.countInStock}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <Link to={`/admin/product/${product._id}/edit`} className="text-gray-400 hover:text-charcoal p-2 transition-colors">
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(product._id)}
                          className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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

export default ProductListScreen;
