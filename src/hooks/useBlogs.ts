import { useState, useEffect } from "react";
import { api } from "../api";

export type BlogFull = {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  category: {
    name: string;
    description: string;
  };
  createdAt: string;
  lastModified: string;
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogFull[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogsLatest();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, loading, fetchBlogs };
};
