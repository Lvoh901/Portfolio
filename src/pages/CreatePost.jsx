
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex gap-2 mb-2">
      <button type="button" onClick={() => onClick('bold')} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">Bold</button>
      <button type="button" onClick={() => onClick('italic')} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">Italic</button>
      <button type="button" onClick={() => onClick('underline')} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">Underline</button>
    </div>
  );
};

import { $generateHtmlFromNodes } from '@lexical/html';

const editorConfig = {
  namespace: 'MyEditor',
  theme: {},
  onError(error) {
    throw error;
  },
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating...');

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, author, image_url: imageUrl, category }]);

    if (error) {
      console.error('Error creating post:', error);
      setStatus('Failed to create post. Please try again.');
    } else {
      setStatus('Post created successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      setImageUrl('');
      setCategory('');
    }
  };

  const handleContentChange = (editorState, editor) => {
    editorState.read(() => {
      const html = editor.getEditorState().read(() => $generateHtmlFromNodes(editor, null));
      setContent(html);
    });
  };

  return (
    <section className='min-h-screen mx-auto max-w-4xl py-20 px-8 lg:px-0'>
      <h1 className='font-black text-4xl mb-8'>Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04]"
        />

        <LexicalComposer initialConfig={editorConfig}>
          <div className="relative">
            <ToolbarPlugin />

            <RichTextPlugin
              contentEditable={<ContentEditable className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] min-h-[200px]" />}
              placeholder={<div className="absolute top-3 left-3 text-gray-400">Enter some text...</div>}
            />

            <OnChangePlugin onChange={handleContentChange} />

            <HistoryPlugin />
          </div>
        </LexicalComposer>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04]"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04]"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04]"
        />

        <button
          type="submit"
          className="bg-[#fcba04] text-white font-bold py-3 px-6 rounded-md hover:bg-[#e0a800] transition duration-300"
        >
          Create Post
        </button>
      </form>
      {status && <p className="mt-4 text-center text-lg">{status}</p>}
    </section>
  );
};

export default CreatePost;
