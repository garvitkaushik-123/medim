import { useState } from "react";
import EditForm from "../pages/EditForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import style from "./Posts.module.css";

function Post({ post, setYourPosts }) {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const navigate = useNavigate();
  const { userCredentials, setUserCredentials } = useAuth();

  let {
    title,
    topic,
    description: text,
    author,
    id,
    author_id,
    created_at,
  } = post;
  console.log(post);
  // let authorId = 1;
  let publishTime = "5/8/23";
  created_at = new Date(created_at);
  created_at = new Intl.DateTimeFormat("en-in").format(created_at);
  publishTime = created_at;
  text = text.slice(0, 100);
  text += "......... ";
  let image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZ7RA3mlDh5vqCoNLmv5kUwDpKE8KN4ldm57DJepB8Q&s";

  function handlePostDelete() {
    // synchronization with server required
    axios
      .delete(`http://127.0.0.1:3001/delete`, {
        body: { id },
        headers: { Authorization: `Bearer ${userCredentials.auth_token}` },
      })
      .then((response) => {
        console.log("delete", response);
        setYourPosts?.((c) => {
          localStorage.setItem(
            "posts_1",
            JSON.stringify(c.filter((elm) => elm.id !== id))
          );
          return c.filter((elm) => elm.id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handlePostEdit() {
    setEditFormVisible(true);
  }

  function handleClick() {
    navigate(`/post/${id}`);
  }

  return (
    <div className={style.Post}>
      <div className={style.postContent}>
        <div className={style.postImgContainer}>
          <img src={image}></img>
        </div>
        <div className={style.postWrite}>
          <div className={style.postTitle}>{title}</div>
          <div className={style.postText}>
            {text}
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={handleClick}
            >
              Click to Continue Reading
            </span>
          </div>
          <div className={style.postPublishTime}>{publishTime}</div>
          <div className={style.postAuthor}>
            <Link to={`/checkout/${author_id}`}>Author | {author_id}</Link>
          </div>
        </div>
      </div>
      {setYourPosts && (
        <div className={style.postOptions}>
          <div className={style.postDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={handlePostDelete}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <div className={style.postEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={handlePostEdit}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </div>
      )}

      {setYourPosts && isEditFormVisible && (
        <EditForm
          id={id}
          setYourPosts={setYourPosts}
          setEditFormVisible={setEditFormVisible}
        ></EditForm>
      )}
    </div>
  );
}

export default Post;
