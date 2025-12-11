"use client"

import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
        >
          PODO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {/* CTA Button */}
          <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`}
          />
          <span className={`w-5 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64" : "max-h-0"}`}>
        <div className="px-6 py-4 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
