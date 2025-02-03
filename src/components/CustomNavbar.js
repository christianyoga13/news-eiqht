"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Youtube", url: "https://youtube.com" },
    { name: "Tiktok", url: "https://tiktok.com" },
    { name: "LinkedIn", url: "https://linkedin.com" }
  ];

  const menuItems = [
    { name: "Home", path: "https://www.eiqht.com/" },
    { name: "About Us", path: "https://www.eiqht.com/about" },
    { name: "Works", path: "https://www.eiqht.com/works" },
    { name: "News", path: "/" },
    { name: "Whitepaper", path: "https://www.eiqht.com/whitepaper" },
    { name: "Contact", path: "https://www.eiqht.com/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-black h-24 px-12 flex justify-between items-center py-20 w-full relative z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white text-2xl font-light ml-20 mt-10">
            <Image
              src="/site-logo-light.png"
              alt="Site Logo"
              width={80}
              height={40}
            />
          </Link>
          <div className="relative ml-48 mt-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-24 h-8 relative focus:outline-none"
              aria-label="Menu"
            >
              <motion.span
                className="absolute top-1/2 right-5 w-24 h-[1px] bg-white -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : -4,
                  width: isOpen ? "50px" : "50px",
                }}
                initial={{ width: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute top-1/2 right-5 w-12 h-[1px] bg-white -translate-x-1/2 -translate-y-1/2 mt-[0.15rem]"
                animate={{
                  rotate: isOpen ? -135 : 0,
                  y: isOpen ? 0 : 4,
                  width: isOpen ? "50px" : "50px",
                }}
                initial={{ width: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </button>
          </div>
        </div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/start-project"
            className="relative group text-[#646464] px-6 py-3 rounded-full transition-colors mr-10 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white font-bold text-md">
              Start a Project
            </span>
            <motion.span
              className="absolute top-5 -translate-y-1/2 h-14 bg-[#2a2e31] rounded-full"
              style={{ left: isHovered ? "-0.5rem" : "-0.5rem", zIndex: 0 }}
              animate={{
                width: isHovered ? "110%" : "3.5rem",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            />
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "100vh" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="fixed top-24 left-0 w-full bg-black overflow-hidden transition-all duration-300 ease-in-out z-40"
        style={{ top: "96px" }}
      >
        <div className="container mx-auto px-12 py-16 flex justify-between">
          <div className="w-72 mt-72">
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={menuVariants}
            >
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  variants={itemVariants}
                  className="mb-4"
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors text-xl"
                  >
                    {social.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="flex-1 flex justify-end">
            <motion.ul
              className="space-y-8 text-left w-full"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={menuVariants}
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  className="text-white text-5xl font-bold hover:text-gray-300 transition-colors"
                >
                  <Link href={item.path}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
