import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-red-500">Zomato</h2>
            <p className="text-sm">© {new Date().getFullYear()} Zomato. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <NavLink to="/about" className="hover:text-red-500">
              About
            </NavLink>
            <NavLink to="/careers" className="hover:text-red-500">
              Careers
            </NavLink>
            <NavLink to="/help" className="hover:text-red-500">
              Help
            </NavLink>
            <NavLink to="/contact" className="hover:text-red-500">
              Contact
            </NavLink>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
