import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../services/apiService';
import { setProducts } from '../features/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      dispatch(setProducts(data));
    };
    getProducts();
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Product List</h2>
      <table className="w-full border-collapse border border-blue-500">
        <thead>
          <tr>
            <th className="border border-blue-400 p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 p-2">{product.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 p-2">No products available</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default ProductList;