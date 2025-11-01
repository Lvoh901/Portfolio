import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setPosts(data);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className='min-h-screen mx-auto container py-20 px-8 lg:px-0'>
      <h1 className='font-black capitalize animate-fade-up text-center'>My Blog</h1>
      <p className='w-full lg:w-[600px] text-center mx-auto mb-10'>Thoughts, insights, and updates on my journey in software development, design, business, and personal hobbies.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg shadow-md p-6 cursor-pointer">
            <h3 className="font-bold mb-1 text-gray-900 dark:text-white">{post.title}</h3>

            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
              <small className="">{new Date(post.created_at).toLocaleDateString()}</small> ||
              <small>{post.author}</small>
            </div>

            <p className="text-gray-7700 mt-2">{post.content.substring(0, 150)}...</p>

            <a href={`/blog/${post.id}`} className="text-[#fcba04] hover:underline mt-4 inline-block">Read More</a>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No blog posts yet. Stay tuned!</p>
      )}
    </section>
  );
};

export default Blog;