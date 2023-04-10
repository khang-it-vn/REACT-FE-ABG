import React, { useState,useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {token, axiosClientJson} from ".././http-config/axiosClient"
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
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClientJson.get("/user/docs");
        const data = response.data;
        setPosts(data);
        setSelectedPost(data[0]); // Chọn bài viết đầu tiên làm selectedPost
      } catch (error) {
        if (axiosClientJson.isaxiosClientError(error)) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

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
            {posts && posts
              .filter((post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((post) => (
                <li
                  className={`my-select text-center ${selectedPost?.id_doc === post.id_doc ? "bg-blue-500" : ""
                    }`}
                  key={post.id_doc}
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </li>
              ))}
          </ul>
        </div>
        {/* Layout bên phải */}
        {selectedPost && (
          <div className="flex-1 bg-white p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">
              {selectedPost.title}
            </h1>
              {selectedPost.description}
            <PostDetails className="mt-auto" details={details} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Document;
