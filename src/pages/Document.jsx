import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const details = {
  author: "John Doe",
  date: "01/01/2022",
  views: 1000,
};

function PostDetails({ details }) {
  return (
    <div className="p-4 border rounded-xl bg-white text-black">
      <p>
        <span>Tên tác giả:</span> {details.author}
      </p>
      <p>
        <span>Ngày đăng:</span> {details.date}
      </p>
      <p>
        <span>Lượt xem:</span> {details.views}
      </p>
    </div>
  );
}

function Document() {
  const [selectedPost, setSelectedPost] = useState(false);
  const content = "Nội dung bài viết sẽ được hiển thị ở đây.";
  const [searchValue, setSearchValue] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, title: "Bài viết 1" },
    { id: 2, title: "Bài viết 2" },
    { id: 3, title: "Bài viết 3" },
    { id: 4, title: "Bài viết 4" },
    { id: 5, title: "Bài viết 5" },
  ]);

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
    };
    setPosts([...posts, newPost]);
    setNewPostTitle("");
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black rounded-lg">
      <Header />
      <div className="flex flex-row min-h-screen mt-20 bg-black rounded-lg">
        {/* Layout bên trái */}
        <div className="w-1/4 bg-blue-400 p-4">
          <h1 className="text-white font-bold mb-4">List Document:</h1>
          <label className="relative">
            <label className="relative">
              <input
                className="bg-white p-2 pl-10 rounded-md mb-4"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute top-0 left-3 text-black"
              />
            </label>
          </label>
          <ul>
            {posts
              .filter((post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
              )

              .map((post) => (
                <li
                  className={`my-select text-center ${
                    selectedPost?.id === post.id ? "bg-blue-500" : ""
                  }`}
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                  <button
                    className="ml-2 text-sm text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPosts(posts.filter((p) => p.id !== post.id));
                      setSelectedPost(false);
                    }}
                  >
                    Xóa
                  </button>
                </li>
              ))}
          </ul>
          <button
            className="bg-green-500 text-white p-2 rounded-md"
            onClick={handleAddPost}
          >
            Add Post
          </button>
          <input
            type="text"
            value={newPostTitle}
            placeholder="New post title"
            className="bg-white p-2 mt-4 rounded-md"
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        {/* Layout bên phải */}
        {selectedPost && (
          <div className="flex-1 bg-white p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">
              {selectedPost.title}
            </h1>
            {[1, 2, 3, 4].map((index) => (
              <p className="mb-4 text-black" key={index}>
                {content}
              </p>
            ))}
            <PostDetails className="mt-auto" details={details} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Document;
