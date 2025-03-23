import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddProductsModal from '../components/AddProductModal';
import { getProducts } from '../features/productSlice';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleQuickEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleUpdate = () => {
    console.log('Updating product:', editingProduct);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.grade.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(0, itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 rounded-full text-white px-6 py-2">+ Add Product</button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="w-96 rounded-l-full shadow-lg bg-white outline-none px-4 py-2"
          placeholder="Search by product, material, or grade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-700 px-4 py-2 text-white rounded-r-full">Search</button>
      </div>
      
      <div className="mb-4 flex items-center">
        <span className="mr-4 text-xl font-semibold">Product List</span>
        <select
          className="px-4 py-2 rounded-full bg-white border-gray-300 border"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[10, 25, 50, 100, 250, 400].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <span className="ml-4 px-4 py-2 bg-gray-200 rounded-full">{filteredProducts.length}/400 Products</span>
      </div>

      {isModalOpen && <AddProductsModal onClose={() => setIsModalOpen(false)} />}

      {paginatedProducts.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 text-center shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Actions</th>
              <th className="border border-gray-300 p-2">Product Detail</th>
              <th className="border border-gray-300 p-2">Price In Unit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <React.Fragment key={product._id}>
                <tr>
                  <td className="border border-gray-300 p-2">{product.product.name} {product.grade.name} {product.material.name}</td>
                  <td className="border border-gray-300 p-2">
                    <a onClick={() => handleQuickEdit(product)} className="text-blue-800 cursor-pointer">Quick edit</a> | 
                    <a className="text-green-600 cursor-pointer">Add Product Detail</a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex flex-col">
                      <span>Material: {product.material.name}</span>
                      <span>Length: {product.length}</span>
                      <span>Shape: {product.shape}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">350 / KG</td>
                </tr>
                {editingProduct && editingProduct._id === product._id && (
                  <tr>
                    <td colSpan="4" className="border border-gray-300 p-2">
                      <div className="flex space-x-4 p-4 bg-gray-100">
                        <input type="text" value={editingProduct.product.name} onChange={(e) => setEditingProduct({ ...editingProduct, product: { ...editingProduct.product, name: e.target.value } })} className="border p-2 rounded-full" />
                        <input type="text" value={editingProduct.material.name} onChange={(e) => setEditingProduct({ ...editingProduct, material: { ...editingProduct.material, name: e.target.value } })} className="border p-2 rounded-full" />
                        <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="border p-2 rounded-full" />
                        <input type="text" value={editingProduct.shape} onChange={(e) => setEditingProduct({ ...editingProduct, shape: e.target.value })} className="border p-2 rounded-full" />
                        <button onClick={handleUpdate} className="bg-blue-500 w-50 text-white rounded-full px-4 py-2">Update</button>
                        <button onClick={handleCancelEdit} className="bg-gray-400 rounded-full w-50 text-white px-4 py-2">Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Home;