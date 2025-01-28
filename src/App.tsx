import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./screens/BlogList";
import BlogForm from "./screens/BlogForm";
import Register from "./screens/RegisterScreen";
import Login from "./screens/LoginScreen";
import FullBlogPage from "./screens/BlogFullPage";
import BlogEdit from "./screens/BlogEdit";

const App = () => {
  const LinkComp = ({ title, path }: { title: string; path: string }) => {
    return (
      <div className="hover:scale-110 transform transition duration-300">
        <Link
          to={path}
          className="mr-5 hover:text-yellow-400 transform transition duration-300"
        >
          {title}
        </Link>
      </div>
    );
  };
  return (
    <Router>
      <div className="">
        <nav className="flex justify-between p-4 bg-pink-500 font-extrabold">
          <div className="flex justify-between">
            <LinkComp title="Blog" path="/" />
            <LinkComp title="Create Blog" path="/create" />
          </div>
          <div className="flex justify-between">
            <LinkComp title="Login" path="/login" />
            <LinkComp title="Register" path="/register" />
          </div>
        </nav>
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<FullBlogPage />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogEdit/:id" element={<BlogEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
