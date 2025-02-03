import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-16">
            {/* Marquee Section */}
            <div className="relative flex overflow-hidden mb-4">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(12)].map((_, i) => (
                        <span key={i} className="mx-4 text-6xl italic font-bold">
                            NEWS
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer Content */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="w-32">
                            <Image 
                                src="/site-logo-light.png" 
                                alt="eight logo" 
                                width={104}
                                height={56}
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="text-sm text-gray-400">2025©</p>
                    </div>

                    <div className="space-y-4">
                        <ul className="space-y-2">
                            {['Instagram', 'Youtube', 'Tiktok', 'LinkedIn'].map((platform, index) => (
                                <li key={index}>
                                    <Link href="#" className="hover:text-gray-300 transition-colors">
                                        {platform}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <div className="text-gray-400">
                            <h5 className="font-normal">
                                Indonesia
                                <br />
                                Tangerang, Banten 15710, ID
                                <br />
                                <br />
                                +62 821 3136 5055
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16">
                <div>
                    <Link 
                        href="mailto:hello@eiqht.com" 
                        className="text-4xl md:text-5xl font-bold hover:text-gray-300 transition-colors inline-flex items-center gap-2"
                    >
                        hello@eiqht.com
                        <svg 
                            className="w-6 h-6 transform rotate-45" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
