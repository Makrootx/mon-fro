type BlogCardProps = {
  title: string;
  body: string;
  lastModified: string;
  userName: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  body,
  lastModified,
  userName,
}) => (
  <div className="border rounded p-4 shadow-md hover:scale-102 cursor-pointer transition duration-150">
    <div className="flex justify-between">
      <div className="flex items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <h5 className="ml-3 text-sm">-{lastModified}</h5>
      </div>
      <h4>{userName}</h4>
    </div>
    <p className="text-ellipsis overflow-hidden whitespace-nowrap">{body}</p>
  </div>
);

export default BlogCard;
