"use client";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/supabase/client';

export default function Home() {
  const [news, setNews] = useState([]);
  const [hoveredNews, setHoveredNews] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      delay: 200,
    });
  }, []);

  useEffect(() => {
    async function getNews() {
      try {
        const newsData = await fetchNews();
        console.log('Fetched news data:', newsData);
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    getNews();
  }, []);

  // Fungsi untuk update posisi kursor
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX + 20, y: e.clientY + 20 }); // Geser sedikit agar tidak menutupi kursor
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-32 relative">
      <h1 className="text-[6.875rem] font-bold mb-6 text-white ml-36" data-aos="fade-right">News</h1>
      <div className="flex flex-col gap-10">
        {news.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          news.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <div 
                className="shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
                style={{ width: '100%', height: 'auto', maxHeight: '700px' }}
                data-aos="zoom-in"
                onMouseEnter={() => setHoveredNews(item)}
                onMouseMove={handleMouseMove} 
                onMouseLeave={() => setHoveredNews(null)}
              >
                <div className='container py-6'>
                  <small className='pl-6 text-white'>{new Date(item.created_at).toLocaleDateString()} - News</small>
                  <h2 className='pl-6 text-white text-4xl font-bold mt-4'>{item.title}</h2>
                  <p className='pl-6 pt-1 text-gray-500/70 text-sm'>
                    {item.content.split(' ').slice(0, 50).join(' ')}...
                  </p>
                  <hr className='mt-8 border-t-2 border-gray-500/70' />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      {hoveredNews && hoveredNews.image_url && (
        <div 
          className="fixed pointer-events-none z-50 rounded-lg shadow-lg overflow-hidden border-2 border-white"
          style={{ 
            top: `${cursorPos.y}px`, 
            left: `${cursorPos.x}px`,
            width: '300px',
            height: '200px',
            transform: 'translate(15%, 15%)' 
          }}
        >
          <img src={hoveredNews.image_url} alt={hoveredNews.title} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
