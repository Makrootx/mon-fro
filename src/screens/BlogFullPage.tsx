import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { useCurUserWithBlogs } from "../hooks/useCurUserWithBlogs";
import { useEffect, useState } from "react";
import { api } from "../api";
import { AxiosError } from "axios";

const FullBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog(id);
  const { userFull } = useCurUserWithBlogs();
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userFull) {
      if (userFull.blog.some((blog) => blog._id == id)) setEditable(true);
    }
  }, [id, userFull]);

  const handleDeleteClick = () => {
    api
      .deleteBlog({ id })
      .then(() => {
        alert("Blog has been deleted");
        navigate("/", { replace: true });
      })
      .catch((err) => alert((err as AxiosError).message));
  };

  const handleEditClick = () => {
    navigate(`/blogEdit/${id}`);
  };

  const EditableLayout = () => {
    return (
      <div className="flex gap-4">
        <button
          className="bg-red-500 px-2 hover:bg-red-600 cursor-pointer transition duration-200 text-white w-full py-2 rounded"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className="bg-orange-500 px-2 hover:bg-orange-600 cursor-pointer transition duration-200 text-white w-full py-2 rounded"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    );
  };

  if (!blog) {
    return <p>Blog not found</p>;
  } else if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-end">
        {editable ? <EditableLayout /> : <></>}
      </div>
      <h1 className="font-bold text-3xl">{blog.title}</h1>
      <h3>{blog.category.name}</h3>
      <h4 className="mt-4 text-lg text-gray-500">
        Written by {blog?.user.name} on {blog?.lastModified}
      </h4>
      <p className="mt-4">{blog?.content}</p>{" "}
    </div>
  );
};

export default FullBlogPage;
