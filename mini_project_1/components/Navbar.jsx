"use client";

import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const nav_content = () => (
    <div className="flex justify-around items-center">
      <Link href="/" className="text-gray-300 cursor-pointer">Home</Link>
      <Link href="/about" className="text-gray-300 cursor-pointer">About</Link>
      <Link href="/contact" className="text-gray-300 cursor-pointer">Contact</Link>
    </div>
  );

  return (
    <div className="relative w-full h-[80px] bg-gray-800 flex justify-between p-4 items-center">
      
      {/* Logo */}
      <div className="flex justify-center items-center">
        <Link href="/" className="text-3xl font-semibold p-2 text-white">PODO</Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-[50%]">
        {nav_content()}
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="md:hidden flex flex-col justify-between h-5"
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 md:hidden p-4">
          {nav_content()}
        </div>
      )}

    </div>
  );
};

export default Navbar;
