import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit-icon.png";
import Delete from "../img/delete-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const Detail = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <div className="content">
        <div className="user">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png"
            alt=""
          />
          <div className="info">
            <span>{post.username}</span>
            <p>Update {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post?.username && (
            <div className="edit">
              <Link className="link" to="/write?edit=2" state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>

        <h1>{post?.title}</h1>
        <p className="degree">
          Minimal Lulusan : {post?.pendidikan} Pendaftaran:
        </p>
        <p>
          {" "}
          Pendaftaran: {moment(post?.startDate).format("DD MMM YYYY")} -{" "}
          {moment(post?.finishDate).format("DD MMM YYYY")}
        </p>
        <p>Kuota kandidat : {post?.kandidat}</p>
        <p>Job Description : </p>
        {post?.description}
      </div>
      <div className="menu">
        {currentUser.username !== post?.username && <button>Apply Now</button>}
      </div>
    </div>
  );
};

export default Detail;
