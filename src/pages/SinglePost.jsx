
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SinglePost = () => {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unslugify = (slug) => {
      return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', unslugify(title))
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setPost(data);
        setLoading(false);
      }
    };

    fetchPost();
  }, [title]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading post...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex justify-center items-center">Post not found.</div>;
  }

  return (
    <section className='min-h-screen mx-auto container py-20 px-8 lg:px-0'>
      <img src={post.image_url} alt={post.title} className="w-full h-96 object-cover rounded-t-[2em] mb-8" />

      <h3 className='font-black text-4xl mb-2'>{post.title}</h3>

      <div className='flex flex-col'>
        <span className="text-gray-600 dark:text-gray-400 text-sm mb-4">Post by {" "}<strong className='underline underline-offset-4 decoration-[#fcba04] decoration-2'>{post.author} on {new Date(post.created_at).toLocaleDateString()}</strong></span>

        <span className='text-[#fcba04] font-bold'>#{post.category}</span>
      </div>

      <div className="prose dark:prose-invert max-w-none pt-3 space-y-3" dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>
  );
};

export default SinglePost;
