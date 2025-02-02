"use client";

import { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/supabase/client';

export default function Home() {
  const [news, setNews] = useState([]);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[6.875rem] font-bold mb-6 text-white ml-36">News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          news.map((item) => (
            <div 
              key={item.id} 
              className="bg-white bg-opacity-20 rounded-lg shadow-md hover:shadow-lg transition-shadow "
              style={{ width: '100%', maxWidth: '560px', height: 'auto', maxHeight: '700px' }}
            >
              <div className="h-48 bg-gray-300 rounded-t-lg mb-6">
                {/* Placeholder for image */}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-white">{item.title}</h2>
                <p className="text-gray-500 mb-4">{item.content}</p>
                <small className="text-gray-400">{new Date(item.created_at).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}