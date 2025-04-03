import React, { useState, useEffect, useRef } from "react";

// List of all talukas in Maharashtra
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

export default function Add() {
  const [machinary, setMachinary] = useState("tractor");
  const [company, setCompany] = useState("");
  const [spec, setSpec] = useState("");
  const [taluka, setTaluka] = useState("");
  const [todate, setToDate] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [price, setPrice] = useState("");
  const [upload, setUpload] = useState(false);
  const [image, setImage] = useState(null);
  
  // States for dropdown search
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTalukas, setFilteredTalukas] = useState(maharashtraTalukas);
  
  // Reference for dropdown to handle clicks outside
  const dropdownRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todate);
    console.log(fromdate);
    const UserID = 3;
    
    // Build form data for file upload along with other fields
    const formData = new FormData();
    formData.append("id", UserID);
    formData.append("product_type", machinary);
    formData.append("company_name", company);
    formData.append("description", spec);
    formData.append("taluka", taluka);
    formData.append("ask_price", price);
    formData.append("available_till", todate);
    formData.append("available_from", fromdate);
    formData.append("pincode", 411046);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/postproduct/', {
        method: 'POST',
        headers: {
          // Do not set Content-Type header when using FormData; the browser will set it with proper boundary.
          'token': localStorage.getItem('token'),
          'httpvinay': "localStorage.getItem('token')"
        },
        body: formData,
      });
  
      if (!response.ok) {
        alert("error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setUpload(true);
      // Reset form after successful submission
      setMachinary("tractor");
      setCompany("");
      setSpec("");
      setTaluka("");
      setToDate("");
      setFromDate("");
      setPrice("");
      setImage(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpload(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert("error");
    }
  };
  
  return (
    <>
      <p className="text-center text-3xl font-semibold mt-2 mb-5">
        Earn By renting your Farm machinery
      </p>
  
      <form 
        className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-2xl my-3 w-2/3" 
        onSubmit={handleSubmit}
      >
        <div className="flex items-center">
          <label className="mr-2 font-medium">
            Choose a machinery:
          </label>
          <select 
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
            value={machinary}
            onChange={(e) => setMachinary(e.target.value)}
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
  
        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Company Name:
        </label>
        <input
          type="text"
          name="company"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
  
        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Specification:
        </label>
        <input
          type="text"
          id="caption"
          name="specification"
          required
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
  
        {/* Searchable Taluka Dropdown */}
        <div className="my-4 relative" ref={dropdownRef}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Taluka:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={taluka || "Search taluka..."}
              value={searchTerm}
              onClick={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      taluka === talukaOption ? "bg-green-100" : ""
                    }`}
                    onClick={() => {
                      setTaluka(talukaOption);
                      setSearchTerm("");
                      setIsDropdownOpen(false);
                    }}
                  >
                    {talukaOption}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No talukas found</div>
              )}
            </div>
          )}
          
          {taluka && (
            <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {taluka}
              <button
                type="button"
                className="ml-1 text-green-600 hover:text-green-800"
                onClick={() => setTaluka("")}
              >
                &times;
              </button>
            </div>
          )}
        </div>
  
        <label className="block text-gray-700 font-bold my-2">
          Availability:
        </label>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <p className="mb-1">From:</p>
            <input
              type="date"
              name="from"
              value={fromdate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <p className="mb-1">To:</p>
            <input
              type="date"
              name="to"
              value={todate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
  
        <label className="block text-gray-700 font-bold my-3">
          Enter the price:
        </label>
        <div className="flex mb-1">
          <p className="font-medium mr-3 my-auto">Per Hour:</p>
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 my-auto">
              ₹
            </span>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="1"
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
  
        <div className="mb-4 my-3">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload image:
          </label>
          <div className="flex items-center justify-center w-full h-32 border-dashed border-2 border-gray-400 rounded-md hover:bg-gray-50 transition-colors">
            <label htmlFor="image" className="cursor-pointer text-gray-500 flex flex-col items-center">
              {image ? (
                <>
                  <div className="text-green-600 font-medium">Selected: {image.name}</div>
                  <span className="text-xs text-gray-500 mt-1">Click to change</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span>Choose File</span>
                </>
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>
  
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-colors w-full"
        >
          Submit
        </button>
      </form>
      {upload && (
        <div className="fixed bottom-4 right-4 text-white p-4 bg-green-600 rounded-md shadow-lg">
          Product added successfully!
        </div>
      )}
    </>
  );
}