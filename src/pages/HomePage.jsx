import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddProductModal from '../components/AddProductModal';
import { getProducts } from '../features/productSlice';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
          className="w-1/2 rounded-l-xl shadow-lg bg-white outline-none px-4 py-2"
          placeholder="Search by product, material, or grade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-700 px-4 py-2 text-white rounded-r-xl">Search</button>
        <span className="ml-4 px-4 py-2 bg-gray-200 rounded-full">{filteredProducts.length}/400 Products</span>
      </div>

      <div className='flex items-center mb-4'>
        <h2 className="text-xl font-semibold">Products List</h2>
        <select
          className="ml-4 px-4 py-2 border rounded-full float-left"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[10, 50, 100, 250, 400].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}

      {paginatedProducts.length > 0 ? (
        <table className="table-auto w-full border-collapse border text-center border-blue-500 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Actions</th>
              <th className="border border-gray-300 p-2">Product Detail</th>
              <th className="border border-gray-300 p-2">Price In Unit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  {product.product.name} {product.grade.name} {product.material.name}
                </td>
                <td className="border border-gray-300 p-2">
                  <a className="text-blue-800 cursor-pointer">Quick edit</a> | 
                  <a className="text-green-600 cursor-pointer">Add Product Detail</a>
                </td>
                <td className="border border-gray-300 p-1"> 
                  <div className='flex flex-col'>
                    <h6> Material : <span>{product.material.name}</span> </h6>
                    <h6> Unit Length : <span>{product.length}</span> </h6>
                    <h6> Shapes : <span>{product.shape}</span> </h6>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">350 / KG</td>
              </tr>
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
