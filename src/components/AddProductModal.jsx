import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/productSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductsModal = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState('Pipes');
  const [selectedMaterial, setSelectedMaterial] = useState('Aluminum');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [shape, setShape] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate()

  const dispatch = useDispatch();

  const products = ['Pipes', 'Tubing', 'Steel', 'Flanges', 'Gaskets', 'Bolts'];
  const materials = ['Alloy Steel', 'Aluminum', 'Carbon Steel', 'Stainless Steel'];
  const grades = ['Aluminum F11 Pipes', 'Aluminum F5 Pipes', 'Aluminum F9 Pipes', 'Aluminum F91 Pipes'];

  const toggleGrade = (grade) => {
    setSelectedGrades((prev) => prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]);
  };

  const validateForm = () => {
    if (!price || !shape || !length || !thickness || selectedGrades.length === 0) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const data = {
        productName: selectedProduct,
        materialName: selectedMaterial,
        gradeName: selectedGrades.join(', '), 
        price,
        currency,
        shape,
        length,
        thickness
      };
  
      console.log('Sending Data:', data);
  
      const response = await axios.post('http://localhost:5000/api/create', data);
  
      if (response.status === 201) {
        dispatch(addProduct(response.data));
        Navigate('/')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setError(`Failed to add product: ${errorMessage}`);
      console.error(errorMessage);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&#10005;</button>
        <h2 className="text-2xl font-semibold mb-4">Add Products</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <hr className='pb-2 px-1 h-0 text-blue-700 '/>
            {products.map((product) => (
              <div key={product} onClick={() => setSelectedProduct(product)} className={`p-2 cursor-pointer ${selectedProduct === product ? ' bg-blue-200 text-black' : 'bg-gray-100'}`}>{product}</div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Material</h3>
            <hr className='pb-2 px-1 h-0 text-blue-700 '/>
            {materials.map((material) => (
              <div key={material} onClick={() => setSelectedMaterial(material)} className={`p-2 cursor-pointer ${selectedMaterial === material ? 'bg-blue-200 text-black' : 'bg-gray-100'}`}>{material}</div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Grades</h3>
            <hr className='pb-2 px-1 h-0 text-blue-700 '/>
            {grades.map((grade) => (
              <label key={grade} className="flex items-center mb-2">
                <input type="checkbox" checked={selectedGrades.includes(grade)} onChange={() => toggleGrade(grade)} className="mr-2" />
                {grade}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded-sm p-2" />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border rounded-sm p-2">
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>
          <input type="text" placeholder="Shape" value={shape} onChange={(e) => setShape(e.target.value)} className="border rounded-sm p-2" />
          <input type="text" placeholder="Length" value={length} onChange={(e) => setLength(e.target.value)} className="border p-2 rounded-sm" />
          <input type="text" placeholder="Thickness" value={thickness} onChange={(e) => setThickness(e.target.value)} className="rounded-sm border p-2" />
        </div>

        <button onClick={handleSubmit} className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default AddProductsModal;
