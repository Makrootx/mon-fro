import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

const BlogList = () => {
  const { blogs, loading } = useBlogs();
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/blog/${id}`); // Redirect to the full blog page using the id
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <div onClick={() => handleClick(blog._id)}>
            <BlogCard
              key={blog._id}
              title={blog.title}
              body={blog.content}
              lastModified={blog.lastModified}
              userName={blog.user.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
