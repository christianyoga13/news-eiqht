"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching news item:', error);
        } else {
          setNewsItem(data);
        }
      };

      fetchNewsItem();
    }
  }, [id]);

  if (!newsItem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-72">
      <div className="bg-black bg-opacity-20 rounded-lg shadow-md p-6">
        <h1 className='text-6xl text-center text-white mb-10 mt-4'>{newsItem.title}</h1>
      </div>
      <p className="text-gray-600 mb-4">{new Date(newsItem.created_at).toLocaleString()}</p>
      {newsItem.image_url && (
        <div className="mb-6">
          <Image 
            src={newsItem.image_url} 
            alt={newsItem.title} 
            width={800} 
            height={600} 
            className="w-full h-auto object-cover rounded-lg" 
          />
        </div>
      )}
      <div className="bg-black bg-opacity-20 rounded-lg shadow-md p-6">
        <p className='text-2xl text-white mx-20 mb-10 mt-4'>{newsItem.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;