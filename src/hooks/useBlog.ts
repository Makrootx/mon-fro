import { useState, useEffect, useCallback } from "react";
import { api } from "../api";
import { BlogFull } from "./useBlogs";

export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<BlogFull>();
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getBlog({ id });
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blog, loading, fetchBlogs };
};
