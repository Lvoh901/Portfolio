import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

// SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-4 px-4 lg:px-12">
      <button
        type="button"
        onClick={() => onClick('bold')}
        className="px-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 font-semibold hover:bg-[#fcba04] hover:text-black transition cursor-pointer"
        title="Bold"
      >Bold</button>

      <button
        type="button"
        onClick={() => onClick('italic')}
        className="px-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 font-semibold italic hover:bg-[#fcba04] hover:text-black transition cursor-pointer"
        title="Italic"
      >Italic</button>

      <button
        type="button"
        onClick={() => onClick('underline')}
        className="px-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 font-semibold underline hover:bg-[#fcba04] hover:text-black transition cursor-pointer"
        title="Underline"
      >Underline</button>
    </div>
  );
};

const editorConfig = {
  namespace: 'MyEditor',
  theme: {},
  onError(error) {
    throw error;
  },
};

const categories = [
  { value: '', label: 'Select Category' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Design', label: 'Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Personal', label: 'Personal' }
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author || !imageUrl || !category) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please fill in all fields.',
        confirmButtonColor: '#fcba04'
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content, author, image_url: imageUrl, category }]);

    if (error) {
      console.error('Error creating post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to create post. Please try again.',
        confirmButtonColor: '#fcba04'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post created successfully!',
        confirmButtonColor: '#fcba04'
      });
      setTitle('');
      setContent('');
      setAuthor('');
      setImageUrl('');
      setCategory('');
      // Optionally scroll to top after success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

  const handleContentChange = (editorState, editor) => {
    editorState.read(() => {
      const html = editor.getEditorState().read(() => $generateHtmlFromNodes(editor, null));
      setContent(html);
    });
  };

  return (
    <section className="min-h-screen mx-auto max-w-3xl py-24 px-4 md:px-0">
      <div className="bg-white/80 dark:bg-gray-900/80 shadow-2xl rounded-3xl p-10 flex flex-col gap-3 border border-[#fcba041f]">
        <h1 className="font-black text-3xl md:text-4xl mb-2 text-center text-[#fcba04] tracking-tight drop-shadow-lg">
          Create New Post
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-5">Share your insights, updates, or thoughts with the world 🌍</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-1 font-bold uppercase">Title</label>

            <input
              type="text"
              placeholder="Amazing Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold uppercase">Content</label>

            <LexicalComposer initialConfig={editorConfig}>
              <div className="relative">
                <ToolbarPlugin />

                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] min-h-[180px] text-base"
                      style={{ minHeight: '180px', fontSize: '1rem' }} />}
                  placeholder={<div className="absolute top-16 left-3 text-gray-400 pointer-events-none">Enter your post content...</div>}
                />

                <OnChangePlugin onChange={handleContentChange} />

                <HistoryPlugin />
              </div>
            </LexicalComposer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold uppercase">Author</label>

              <input
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold uppercase">Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] transition"
              >
                {categories.map(({ value, label }) => (
                  <option value={value} key={label} disabled={value === ''} hidden={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold uppercase">Cover Image URL</label>

            <input
              type="url"
              placeholder="https://your-image-link.com/cover.webp"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] transition"
            />
            {imageUrl && (
              <div className="mt-2 border rounded-lg overflow-hidden w-full flex flex-col items-center">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full max-w-md h-40 object-cover object-center rounded"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-[#fcba04] text-white font-bold py-3 px-6 rounded-lg shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-[#edae05] focus:ring-4 focus:ring-[#fcba0477] uppercase tracking-wider ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
