import { useEffect, useState } from "react";
import { api } from "../api";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createBlog({ title, content: body, categoryName: category });
      alert("Blog created successfully!");
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
