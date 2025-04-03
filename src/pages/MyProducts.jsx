import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// List of all talukas in Maharashtra (same as Add.jsx)
const maharashtraTalukas = [
  "Ahmednagar", "Akola", "Akot", "Alibag", "Amalner", "Ambad", "Ambejogai", 
  "Amravati", "Anjangaon", "Arvi", "Ashti", "Aurangabad", "Balapur", "Baramati", 
  "Barshi", "Basmat", "Beed", "Bhadrawati", "Bhandara", "Bhir", "Bhiwandi", 
  "Bhusawal", "Borivali", "Buldana", "Chalisgaon", "Chandrapur", "Chiplun", 
  "Chopda", "Dabhol", "Dahanu", "Deolali", "Dhule", "Dighi", "Dombivali", "Durgapur", 
  "Erandol", "Gadchiroli", "Ganeshpuri", "Gondia", "Gondiya", "Goregaon", "Ichalkaranji", 
  "Jaisingpur", "Jalgaon", "Jalna", "Jamkhed", "Jawhar", "Jejuri", "Jintur", "Junnar", 
  "Kagal", "Kalamb", "Kalamnuri", "Kalas", "Kalmeshwar", "Kalyani Nagar", "Kamthi", 
  "Kandivali", "Kankauli", "Kannad", "Karanja", "Karjat", "Karmala", "Karyambudi", 
  "Karvir", "Katol", "Khadki", "Khamgaon", "Khed", "Khopoli", "Kolhapur", "Kopargaon", 
  "Koregaon", "Kulgaon Badlapur", "Kurundvad", "Lanja", "Latur", "Loha", "Lonar", 
  "Lonavala", "Mahabaleswar", "Mahad", "Mahim", "Maindargi", "Malegaon", "Malkapur", 
  "Malvan", "Manchar", "Mangrul Pir", "Manmad", "Marmagao", "Masur", "Matheran", 
  "Mehekar", "Mhaswad", "Mira-Bhayandar", "Miraj", "Morshi", "Mukhed", "Mul", 
  "Mumbai", "Murtijapur", "Murtizapur", "Nagpur", "Nanded", "Nandgaon", "Nandura", 
  "Nandurbar", "Nashik", "Navi Mumbai", "Neral", "Nilanga", "Osmanabad", "Ozar", 
  "Pachora", "Paithan", "Palghar", "Panchgani", "Pandharpur", "Panvel", "Parbhani", 
  "Parli", "Parola", "Partur", "Patan", "Pathardi", "Pathri", "Patur", "Pawni", 
  "Pen", "Phaltan", "Pimpri", "Pune", "Purandar", "Pusad", "Rahimatpur", "Rahuri", 
  "Raigad", "Rajapur", "Rajgurunagar", "Rajura", "Ramtek", "Ratnagiri", "Raver", 
  "Revadanda", "Risod", "Roha", "Sangamner", "Sangli", "Sangole", "Sasvad", "Satana", 
  "Satara", "Savner", "Sawantwadi", "Shahade", "Shegaon", "Shirdi", "Shirpur", 
  "Shirwal", "Sholapur", "Shrirampur", "Sillod", "Sindhudurg", "Sindi", "Sinnar", 
  "Sirur", "Solapur", "Sonegaon", "Talegaon Dabhade", "Tarapur", "Tasgaon", "Thane", 
  "Trimbak", "Tuljapur", "Tumsar", "Udgir", "Ulhasnagar", "Umarga", "Umarkhed", 
  "Umred", "Uran", "Vada", "Vaijapur", "Varangaon", "Vardha", "Vashi", "Vengurla", 
  "Virarwadi", "Wadi", "Wadgaon", "Wagholi", "Wai", "Wani", "Wardha", "Warora", 
  "Warud", "Washim", "Yaval", "Yavatmal", "Yeola", "Bhor", "Haveli"
].sort();


export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
  const navigate = useNavigate();

  // Form state for editing
  const [formData, setFormData] = useState({
    product_type: "",
    company_name: "",
    description: "",
    taluka: "",
    available_from: "",
    available_till: "",
    ask_price: ""
  });
  
  // States for taluka dropdown search
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTalukas, setFilteredTalukas] = useState(maharashtraTalukas);
  
  // Reference for dropdown to handle clicks outside
  const dropdownRef = useRef(null);

  // Fetch user's products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Filter talukas based on search term
  useEffect(() => {
    const filtered = maharashtraTalukas.filter(
      taluka => taluka.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTalukas(filtered);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        // Redirect to login if not authenticated
        navigate("/login");
        return;
      }
      
      const response = await axios.get("http://localhost:8000/api/my-products/", {
        headers: {
          "token": token
        }
      });
      
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load your products. Please try again later.");
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      product_type: product.product_type,
      company_name: product.company_name,
      description: product.description,
      taluka: product.taluka,
      available_from: product.available_from,
      available_till: product.available_till,
      ask_price: product.ask_price
    });
    setEditMode(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        
        await axios.delete(`http://localhost:8000/api/my-products/${productId}/`, {
          headers: {
            "token": token
          }
        });
        
        // Update state to remove deleted product
        setProducts(products.filter(product => product.id !== productId));
        showNotification("Product deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        
        // Show specific error message if available
        if (error.response && error.response.data && error.response.data.message) {
          showNotification(error.response.data.message, "error");
        } else {
          showNotification("Failed to delete product. Please try again.", "error");
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTalukaSelect = (selectedTaluka) => {
    setFormData({
      ...formData,
      taluka: selectedTaluka
    });
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const validateForm = () => {
    // Check if dates are valid
    const fromDate = new Date(formData.available_from);
    const tillDate = new Date(formData.available_till);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for fair comparison
    
    if (fromDate < today) {
      showNotification("Available From date must be today or later", "error");
      return false;
    }
    
    if (tillDate <= fromDate) {
      showNotification("Available Till date must be after Available From date", "error");
      return false;
    }
    
    if (parseFloat(formData.ask_price) <= 0) {
      showNotification("Price must be greater than zero", "error");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        `http://localhost:8000/api/my-products/${selectedProduct.id}/`,
        formData,
        {
          headers: {
            "token": token
          }
        }
      );
      
      // Update the products state with the updated product
      setProducts(products.map(product => 
        product.id === selectedProduct.id ? { ...product, ...response.data.data } : product
      ));
      
      setEditMode(false);
      showNotification("Product updated successfully!", "success");
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification("Failed to update product. Please try again.", "error");
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setSelectedProduct(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Format price as Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Map product type to readable name
  const getProductTypeName = (type) => {
    const typeMap = {
      tractor: "Tractor",
      combineHarvester: "Combine Harvester",
      plow: "Plow",
      seedDrill: "Seed Drill",
      sprayer: "Sprayer",
      thresher: "Thresher",
      rotavator: "Rotavator",
      cultivator: "Cultivator"
    };
    
    return typeMap[type] || type;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">My Listed Equipment</h1>
        
        {/* Notification */}
        {notification.show && (
          <div className={`${
            notification.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
          } px-4 py-3 rounded relative mb-4`} role="alert">
            <span className="block sm:inline">{notification.message}</span>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Edit Form Modal */}
        {editMode && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Edit Equipment Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Equipment Type
                      </label>
                      <select
                        name="product_type"
                        value={formData.product_type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="tractor">Tractor</option>
                        <option value="combineHarvester">Combine Harvester</option>
                        <option value="plow">Plow</option>
                        <option value="seedDrill">Seed Drill</option>
                        <option value="sprayer">Sprayer</option>
                        <option value="thresher">Thresher</option>
                        <option value="rotavator">Rotavator</option>
                        <option value="cultivator">Cultivator</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Searchable Taluka Dropdown */}
                  <div className="mb-4 relative" ref={dropdownRef}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Taluka
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={formData.taluka || "Search taluka..."}
                        value={searchTerm}
                        onClick={() => setIsDropdownOpen(true)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d={isDropdownOpen ? "M14.53 4.53l-1.06-1.06L10 9.94 5.53 3.47 4.47 4.53 10 10.06l5.47-5.53z" : "M5.47 4.47a.75.75 0 011.06 0L10 8.94l3.47-3.47a.75.75 0 111.06 1.06L10.06 10l4.47 4.47a.75.75 0 11-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 01-1.06-1.06L8.94 10 4.47 5.53a.75.75 0 010-1.06z"}
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto border border-gray-300">
                        {filteredTalukas.length > 0 ? (
                          filteredTalukas.map((talukaOption, index) => (
                            <div
                              key={index}
                              className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                                formData.taluka === talukaOption ? "bg-green-100" : ""
                              }`}
                              onClick={() => handleTalukaSelect(talukaOption)}
                            >
                              {talukaOption}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">No talukas found</div>
                        )}
                      </div>
                    )}
                    
                    {formData.taluka && (
                      <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {formData.taluka}
                        <button
                          type="button"
                          className="ml-1 text-green-600 hover:text-green-800"
                          onClick={() => setFormData({...formData, taluka: ""})}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    
                    {/* Hidden input field for form submission */}
                    <input 
                      type="hidden" 
                      name="taluka" 
                      value={formData.taluka} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Available From
                      </label>
                      <input
                        type="date"
                        name="available_from"
                        value={formData.available_from}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Available Till
                      </label>
                      <input
                        type="date"
                        name="available_till"
                        value={formData.available_till}
                        onChange={handleChange}
                        min={formData.available_from}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price Per Hour (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">₹</span>
                      <input
                        type="number"
                        name="ask_price"
                        value={formData.ask_price}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        className="w-full pl-8 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Products List */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
                <p className="text-center">
                  You haven't listed any equipment yet. 
                  <a href="/add" className="text-green-600 font-semibold ml-1 hover:underline">
                    Add your first product!
                  </a>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
                    <div className="relative">
                      {product.image_link ? (
                        <img 
                          src={product.image_link} 
                          alt={product.company_name} 
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded">
                        {getProductTypeName(product.product_type)}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-gray-800 mb-2">{product.company_name}</h2>
                      <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Location:</span>
                        <span>{product.taluka}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Available From:</span>
                        <span>{new Date(product.available_from).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Available Till:</span>
                        <span>{new Date(product.available_till).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-medium">Price Per Hour:</span>
                        <span className="text-xl font-bold text-green-700">{formatPrice(product.ask_price)}</span>
                      </div>
                      
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}