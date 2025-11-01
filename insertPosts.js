import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const posts = [
  {
    title: 'The Importance of UI/UX in Web Development',
    content: 'A great user interface and user experience are crucial for the success of any web application. In this post, we explore why UI/UX is so important and how it can impact user engagement and conversions.',
    author: 'Elvis Odhiambo',
    image_url: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    category: 'UI/UX',
  },
  {
    title: 'Getting Started with React Hooks',
    content: 'React Hooks have revolutionized the way we write React components. This tutorial will guide you through the basics of React Hooks and show you how to use them to manage state and side effects in your functional components.',
    author: 'Elvis Odhiambo',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'React',
  },
  {
    title: 'A Guide to Responsive Web Design',
    content: 'With the increasing use of mobile devices, responsive web design is no longer a luxury but a necessity. This guide will teach you the principles of responsive web design and how to create websites that look great on all devices.',
    author: 'Elvis Odhiambo',
    image_url: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Web Design',
  },
];

const insertPosts = async () => {
  const { data, error } = await supabase.from('posts').insert(posts);

  if (error) {
    console.error('Error inserting posts:', error);
  } else {
    console.log('Successfully inserted posts:', data);
  }
};

insertPosts();