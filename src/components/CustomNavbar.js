"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
return (
    <nav className="bg-[#131313] py-3 px-4 h-[150px] w-full">
        <div className="flex flex-row justify-between">
            <div className="container mx-auto flex items-center">
                <Link href="/" className="flex items-center relative top-8 z-10 ml-14 mt-6">
                    <Image
                        alt="Site Logo"
                        width={80}
                        height={80}
                        src="/site-logo-light.png"
                        className="dark-logo"
                        unoptimized={true}
                    />
                </Link>
                <div className="flex justify-between items-center ml-56 mt-20">
                    <button
                        className="relative z-50 flex flex-col gap-2 w-8 h-8 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 8 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-12 h-[0.07rem] bg-white mb-0"
                        />
                        <motion.div
                            animate={{ rotate: isOpen ? -135 : 0, y: isOpen ? -8 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-12 h-[0.08rem] bg-white"
                        />
                    </button>
                </div>
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "top" }}
                    className="absolute top-[6.2rem] left-0 w-full bg-[#131313]"
                >
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        <li>
                            <Link href="/" className="text-white hover:text-gray-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-white hover:text-gray-300">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-white hover:text-gray-300">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            </div>
            <button className="text-white">Get Started</button>
        </div>
    </nav>
);
};

export default Navbar;
