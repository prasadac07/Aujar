import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <img src="logo.png" alt="Farm Equipment Rental Logo" className="h-24 mb-4" />
            <p className="text-sm mt-2 text-center md:text-left">
              Connecting farmers with affordable equipment rental solutions across Maharashtra.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-500 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="hover:text-green-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-300 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/add" className="hover:text-green-300 transition-colors">Add Equipment</Link>
              </li>
              <li>
                <Link to="/get" className="hover:text-green-300 transition-colors">Browse Equipment</Link>
              </li>
              <li>
                <Link to="/my-products" className="hover:text-green-300 transition-colors">Manage Products</Link>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-500 pb-2">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/get" className="hover:text-green-300 transition-colors">Rent Equipment</Link>
              </li>
              <li>
                <Link to="/add" className="hover:text-green-300 transition-colors">List Equipment</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-300 transition-colors">Manage Bookings</Link>
              </li>

              <li>
                <Link to="/my-products" className="hover:text-green-300 transition-colors">Manage Equipment</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-500 pb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>contact@farmequip.in</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span>123 Agriculture Road, Pune, Maharashtra, India - 411001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-6 border-t border-green-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {currentYear} Farm Equipment Rental. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm hover:text-green-300 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm hover:text-green-300 transition-colors">Privacy Policy</Link>
              <Link to="/faq" className="text-sm hover:text-green-300 transition-colors">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}