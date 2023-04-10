import React, { useState, useCallback, useEffect } from "react";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {token, axiosClientJson} from "../../http-config/axiosClient";
const details = {
  author: "John Doe",
  date: "01/01/2022",
  views: 1000,
};

function PostDetails({ details: { author, date, views } }) {
  return (
    <div className="p-4 border rounded-xl bg-white text-black">
      <p>
        <span>Tên tác giả:</span> {author}
      </p>
      <p>
        <span>Ngày đăng:</span> {date}
      </p>
      <p>
        <span>Lượt xem:</span> {views}
      </p>
    </div>
  );
}

function AdminDoc() {
  const [selectedPost, setSelectedPost] = useState({});
  const content = "Nội dung bài viết sẽ được hiển thị ở đây.";
  const [searchValue, setSearchValue] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [posts, setPosts] = useState([
    { id_doc: 1, title: "Bài viết 1" },
    { id_doc: 2, title: "Bài viết 2" },
    { id_doc: 3, title: "Bài viết 3" },
    { id_doc: 4, title: "Bài viết 4" },
    { id_doc: 5, title: "Bài viết 5" },
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

  const handleAddPost = () => {
    if (newPostTitle) {
        axiosClientJson.post("/admindoc/add", { title: newPostTitle, description:'hahahaha' }).then((res) => {
        setPosts([...posts, res.data]);
        setNewPostTitle("");
      });
    }
  };

  const handleDeletePost = useCallback(
    (id_doc) => {
        axiosClientJson.delete(`/admindoc/delete/${id_doc}`).then(() => {
        setPosts(posts.filter((post) => post.id_doc !== id_doc));
        setSelectedPost({});
      })
    },
    [posts]
  );

  return (
    <div className="flex flex-col min-h-screen overflow-hid_docden bg-black rounded-lg">
      <Header />
      <div className="flex flex-row min-h-screen mt-20 bg-black rounded-lg">
        {/* Layout bên trái */}
        <div className="w-1/4 bg-blue-400 p-4">
          <h1 className="text-white font-bold mb-4">List Document:</h1>
          {/* <button
            className="bg-yellow-500 text-white p-2 rounded-md"
          // onClick={handleShowAllPosts}
          >
            Show All Posts
          </button> */}
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
                  <button
                    className="ml-2 text-sm text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id_doc);
                    }}
                  >
                    Xóa
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {/* Layout bên phải */}
        <div className="w-3/4 bg-white p-4">
          <h1 className="text-black font-bold mb-4">{selectedPost.title}</h1>
          <PostDetails details={details} />
          <p className="mt-4 text-black">{selectedPost.description}</p>
          <div className="mt-4">
            <input
              className="bg-white p-2 rounded-md mr-2"
              type="text"
              placeholder="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleAddPost}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AdminDoc;