import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Book({
  onclick, // Renamed from handleModal to match prop name passed from ProductCard
  img,
  type,
  company,
  spec,
  rate,
  from,
  till,
  taluka,
  id,
}) {
  const [hours, setHours] = useState(1);
  const [price, setPrice] = useState(rate);
  const [book, setBook] = useState(false);
  const [bookDate, setBookDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPrice(hours * rate);
  }, [hours, rate]);

  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "scroll";
    };
  }, []);

  const handleClose = () => {
    if (onclick) {
      onclick(); // Use the onclick prop that's passed from ProductCard
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/bookproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id, hours, date: bookDate }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setBook(true);
      
      // Close modal and redirect after successful booking (after 2 seconds)
      setTimeout(() => {
        handleClose();
        navigate("/dashboard");
      }, 2000);
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error in booking.");
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Book Equipment</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image and Equipment Details */}
          <div className="md:w-2/5">
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <img
                src={img}
                alt={type}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-xl font-bold text-gray-800">{type}</h3>
                <p className="text-gray-600 font-medium">{company}</p>
                <p className="text-sm text-gray-500 mt-1">{spec}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {taluka}
                  </span>
                  <span className="font-bold text-xl text-green-700">₹{rate}/hr</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-semibold text-blue-800">Available From:</p>
              <p className="text-blue-700">{formatDate(from)} to {formatDate(till)}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  How many hours do you need?
                </label>
                <div className="flex items-center">
                  <button 
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded-l"
                    onClick={() => setHours(prev => Math.max(1, prev - 1))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="border-y border-gray-300 p-2 text-center w-16 focus:outline-none"
                    required
                  />
                  <button 
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded-r"
                    onClick={() => setHours(prev => Math.min(24, prev + 1))}
                  >
                    +
                  </button>
                  <span className="ml-2 text-gray-500">hours</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  When do you need it?
                </label>
                <input
                  type="date"
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                  min={from}
                  max={till}
                  className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rate per hour:</span>
                  <span className="font-semibold">₹{rate}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-700">Hours:</span>
                  <span className="font-semibold">{hours}</span>
                </div>
                <div className="flex justify-between items-center mt-1 border-t border-yellow-200 pt-2">
                  <span className="text-gray-700 font-bold">Total:</span>
                  <span className="font-bold text-xl text-green-700">₹{price}</span>
                </div>
              </div>

              <button
                className={`mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading || !bookDate}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </form>

            {/* Success Message */}
            {book && (
              <div className="p-4 mt-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Booking Successful! Redirecting to dashboard...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal") || document.body
  );
}