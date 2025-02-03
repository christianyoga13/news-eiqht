"use client";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/supabase/client';

export default function Home() {
  const [news, setNews] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-8 cursor-none pt-28">
      <h1 className="text-[6.875rem] font-bold mb-6 text-white ml-36" data-aos="fade-right">News</h1>
      <div className="flex flex-col gap-10 cursor-none">
        {news.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          news.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <div 
                className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                style={{ width: '100%', height: 'auto', maxHeight: '700px' }} data-aos="zoom-in"
              >
                <div className='container py-6 cursor-autp'>
                  <small className='pl-6 text-white '>{new Date(item.created_at).toLocaleDateString()} - News</small>
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
    </div>
  );
}