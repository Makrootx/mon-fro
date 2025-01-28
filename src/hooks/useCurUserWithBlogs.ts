import { useState, useEffect } from "react";
import { api } from "../api";

export type UserFull = {
  _id: string;
  name: string;
  email: string;
  blog: {
    _id: string;
    title: string;
    content: string;
    category: {
      name: string;
      description: string;
    };
    createdAt: string;
    lastModified: string;
  }[];
};

export const useCurUserWithBlogs = () => {
  const [userFull, setUserFull] = useState<UserFull>();
  const [loading, setLoading] = useState(false);

  const fetchUserFull = async () => {
    setLoading(true);
    try {
      const data = await api.getCurUserWithBlogs();
      setUserFull(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFull();
  }, []);

  return { userFull, loading, fetchUserFull };
};
