'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  defaultContent,
  defaultProjects,
  defaultTestimonials,
} from '../data/defaultContent';

const ContentContext = createContext(null);

/**
 * Loads published content from the Neon-backed API and falls back to the
 * bundled defaults so the portfolio still renders if the API is offline.
 */
export const ContentProvider = ({ children }) => {
  const [state, setState] = useState({
    content: defaultContent,
    projects: defaultProjects,
    testimonials: defaultTestimonials,
    source: 'fallback',
    loading: true,
  });

  const reload = useCallback(async () => {
    try {
      const response = await fetch('/api/content', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Content request failed (${response.status})`);
      const data = await response.json();
      setState({
        content: data.content ?? defaultContent,
        projects: data.projects ?? defaultProjects,
        testimonials: data.testimonials ?? defaultTestimonials,
        source: 'api',
        loading: false,
      });
    } catch {
      setState((previous) => ({ ...previous, source: 'fallback', loading: false }));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(() => ({ ...state, reload }), [state, reload]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () =>
  useContext(ContentContext) ?? {
    content: defaultContent,
    projects: defaultProjects,
    testimonials: defaultTestimonials,
    source: 'fallback',
    loading: false,
    reload: async () => {},
  };
