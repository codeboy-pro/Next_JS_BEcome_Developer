import React from 'react'
import Link from 'next/link'
import { Home, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer className='bg-[#09090b] border-t border-white/10 mt-auto'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand Section */}
          <div className='flex flex-col'>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4"
            >
              PODO
            </Link>
            <p className='text-gray-400 text-sm'>
              A clean simple website built with Next.js and Tailwind CSS. Perfect for beginner learning web development.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col'>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <div className='flex flex-col gap-2'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className='flex flex-col'>
            <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <Mail className='w-4 h-4' />
                <span>hello@podo.com</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <Phone className='w-4 h-4' />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            {/* Social Links */}
            <div className='flex gap-4 mt-4'>
              <a href="#" className='text-gray-400 hover:text-cyan-500 transition-colors duration-300'>
                <Github className='w-5 h-5' />
              </a>
              <a href="#" className='text-gray-400 hover:text-cyan-500 transition-colors duration-300'>
                <Twitter className='w-5 h-5' />
              </a>
              <a href="#" className='text-gray-400 hover:text-cyan-500 transition-colors duration-300'>
                <Linkedin className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-white/10 mt-8 pt-8 text-center'>
          <p className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} PODO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer