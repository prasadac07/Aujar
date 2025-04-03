import React, { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
// Removed the Manufacturer import since we're removing that component

export default function Get() {
  // Original data from API (unchanged)
  const [originalData, setOriginalData] = useState([]);
  // Filtered data to display
  const [filteredData, setFilteredData] = useState([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  
  // Get unique values for dropdowns
  const [productTypes, setProductTypes] = useState([]);
  const [talukas, setTalukas] = useState([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/postproduct/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const responseData = await response.json();
        setOriginalData(responseData);
        setFilteredData(responseData);
        
        // Extract unique product types and talukas for filters
        // Using filter to remove any null or undefined values
        const types = [...new Set(responseData.map(item => item.product_type).filter(Boolean))];
        const talukasData = [...new Set(responseData.map(item => item.taluka).filter(Boolean))];
        
        setProductTypes(types);
        setTalukas(talukasData);
        
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedType, selectedTaluka, originalData]);

  // Filter function
  const applyFilters = () => {
    if (!originalData || originalData.length === 0) return;
    
    let result = [...originalData];
    
    // Apply price filter
    if (priceRange !== null && priceRange !== undefined) {
      result = result.filter(item => item.ask_price <= priceRange);
    }
    
    // Apply product type filter
    if (selectedType) {
      result = result.filter(item => item.product_type === selectedType);
    }
    
    // Apply taluka filter
    if (selectedTaluka) {
      result = result.filter(item => item.taluka === selectedTaluka);
    }
    
    setFilteredData(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange(50000);
    setSelectedType("");
    setSelectedTaluka("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Filter sidebar */}
        <div className="w-full md:w-1/4 p-4 bg-gray-50 border-r border-gray-200">
          <div className="sticky top-0">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl mt-5 mb-6 text-green-600">
                Filters
              </h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-green-600 hover:text-green-800 underline"
              >
                Reset All
              </button>
            </div>
            
            {/* Price Range Filter */}
            <div className="my-6">
              <label htmlFor="priceRange" className="block text-gray-700 font-bold mb-2">
                Price Range: ₹{priceRange}
              </label>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min="0"
                max="50000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                step="1000"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹50,000</span>
              </div>
            </div>
            
            {/* Product Type Filter */}
            <div className="my-6">
              <label htmlFor="productType" className="block text-gray-700 font-bold mb-2">
                Equipment Type
              </label>
              <select
                id="productType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Types</option>
                {productTypes && productTypes.length > 0 && productTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Taluka Filter */}
            <div className="my-6">
              <label htmlFor="taluka" className="block text-gray-700 font-bold mb-2">
                Location (Taluka)
              </label>
              <select
                id="taluka"
                value={selectedTaluka}
                onChange={(e) => setSelectedTaluka(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Locations</option>
                {talukas && talukas.length > 0 && talukas.map((taluka, index) => (
                  <option key={index} value={taluka}>
                    {taluka}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Manufacturer component removed */}
          </div>
        </div>
        
        {/* Product listing */}
        <div className="w-full md:w-3/4 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center my-8">
              Error: {error}. Please try again later.
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center my-8 text-gray-600">
              No products match your current filters. Try adjusting your filters.
            </div>
          ) : (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl text-green-600">
                  Available Products
                </h2>
                <p className="text-gray-600">
                  Showing {filteredData.length} of {originalData.length} products
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((currdata) => {
                  const {
                    image_link,
                    product_type,
                    company_name,
                    description,
                    ask_price,
                    id,
                    available_from,
                    available_till,
                    taluka,
                  } = currdata;
                  return (
                    <ProductCard
                      key={id}
                      id={id}
                      img={image_link}
                      type={product_type}
                      company={company_name}
                      spec={description}
                      rate={ask_price}
                      taluka={taluka}
                      from={available_from}
                      till={available_till}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}