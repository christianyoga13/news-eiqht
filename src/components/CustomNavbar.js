"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50">
      <div className="bg-black h-24 px-12 flex justify-between items-center py-20 w-full relative z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white text-2xl font-light ml-20 mt-10">
            <Image src="/site-logo-light.png" alt="Site Logo" width={80} height={40} />
          </Link>
          <div className="relative ml-48 mt-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 relative focus:outline-none"
              aria-label="Menu"
            >
              <motion.span
                className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-white -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -4
                }}
              />
              <motion.span
                className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-white -translate-x-1/2 -translate-y-1/2 mt-[0.15rem]"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 4
                }}
              />
            </button>
          </div>
        </div>
        <div className='bg-[#2A2A2A]'></div>
        <Link 
          href="/start-project" 
          className="text-white px-6 py-3 rounded-full hover:bg-[#3A3A3A] transition-colors mr-10"
        >
          Start a Project
        </Link>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? '100vh' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="fixed top-24 left-0 w-full bg-black overflow-hidden transition-all duration-300 ease-in-out z-40"
      >
        <div className="container mx-auto px-12 py-16 flex justify-between">
          <div className="w-72">
            <div>
              {['Instagram', 'Youtube', 'Tiktok', 'LinkedIn'].map((social) => (
                <motion.div
                  key={social}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                  className="mb-8"
                >
                  <Link href="#" className="text-gray-500 hover:text-white transition-colors text-xl">
                    {social}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
              className="text-gray-500 mt-12 text-xl"
            >
              Get in touch!
            </motion.div>
          </div>
          <div className="flex-1 flex justify-end">
            <ul className="space-y-6 text-left w-full">  
              {['Home', 'About Us', 'Works', 'News', 'Whitepaper', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : 20, opacity: isOpen ? 1 : 0 }}
                  className="text-white text-5xl font-bold hover:text-gray-300 transition-colors"
                >
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;