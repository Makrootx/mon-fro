import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog(id);
  const [title, setTitle] = useState(blog?.title);
  const [body, setBody] = useState(blog?.content);
  const [options, setOptions] = useState<string[]>([]);
  const [category, setCategory] = useState(blog?.category.name);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(blog?.title);
    setBody(blog?.content);
    setCategory(blog?.category.name);
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateUserBlog({
        id: id,
        title,
        content: body,
        categoryName: category,
      });
      alert("Blog created successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Failed to create blog", error);
    }
  };

  useEffect(() => {
    api
      .getAllCategories()
      .then((val: { name: string }[]) => {
        const categoryArr = val.map((categor) => categor.name);
        setCategory(categoryArr[0]);
        setOptions(categoryArr);
      })
      .catch((err) => alert(err));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex ">
          <div className="flex flex-col grow">
            <label className="block font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="w-1/4">
            <div className="flex flex-col ml-4">
              <label className="block font-bold px-1">Category</label>
              <select
                className="w-full h-[41px] border rounded-md p-2"
                onChange={handleChange}
              >
                {options.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="block font-bold">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border rounded p-2 w-full"
        ></textarea>
      </div>
      <div className="flex gap-5">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogEdit;
