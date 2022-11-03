import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import ViewImg from "../../writePost/viewImg/ViewImg";
import PostTitle from "../../writePost/postTitle/PostTitle";
import PostImg from "../../writePost/postImg/PostImg";
import PostDesc from "../../writePost/postDesc/PostDesc";
import { GetPostImage } from "../../../../utils/httpRequests/HttpRequest";
import PostContext from "../../../../authContext/postContext";

const UpdatePost = () => {
  const navigate = useNavigate();
  const imageCtx = useContext(PostContext);
  const [post, setPost] = useState({
    username: "",
    postTitle: "",
    postDesc: "",
  });
  const location = useLocation();
  const [imageKey, setImageKey] = useState("");
  const username = window.localStorage.getItem("user");
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    window.localStorage.removeItem("imageId");
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        const imgRes = await GetPostImage(res.data.imageId);
        setImageKey(imgRes.data.imageKey);
      } catch (error) {
        console.log(error);
      }
    };
    imageCtx.setImageId("");
    getPost();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setPost({ ...post, [event.target.id]: event.target.value });
  };

  const handleDeleteImg = async () => {
    window.localStorage.removeItem("imageId");
    window.localStorage.removeItem("imageKey");
    try {
      await axios
        .delete(`/images/${postId}/${imageKey}/${post.imageId}`)
        .then(() => navigate(`/${postId}/updatePost`));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!imageCtx.imageId) {
        await axios.put(`/posts/${postId}`, {
          _id: postId,
          username: username,
          postTitle: post.postTitle,
          postDesc: post.postDesc,
        });
      } else {
        console.log("IN PUT");
        await axios
          .put(`/posts/${postId}/${imageCtx.imageId}`, {
            _id: postId,
            username: username,
            postTitle: post.postTitle,
            postDesc: post.postDesc,
          })
          .then((res) => {
            if (res.status === 201) {
              navigate("/posts");
            }
          });
      }
    } catch (err) {
      console.log(err + post.postTitle);
    }
  };

  return (
    <div>
      <form className="grid grid-row-4">
        <div className="mobile:w-7/12 tablet:w-2/12 mobile:mb-10 place-content-center mt-5 relative ml-96">
          {imageKey ? <ViewImg imageKey={imageKey} /> : null}
          {imageKey ? (
            <button id="delete-button" onClick={handleDeleteImg}>
              Delete Image
            </button>
          ) : null}
        </div>
      </form>
      <form className="grid grid-row-4" onSubmit={handleUpdate}>
        <div className="mobile:w-7/12 tablet:w-2/12 mobile:mb-10 place-content-center mt-5 relative ml-96"></div>
        <PostTitle postTitle={post.postTitle} handleChange={handleChange} />
        <PostDesc postDesc={post.postDesc} handleChange={handleChange} />
        {!imageKey ? <PostImg /> : null}
        <button
          className="
            bg-indigo-500
             hover:bg-indigo-700 
             w-full
            rounded-md 
            font-medium 
            p-5 text-bold
            text-white
            "
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
