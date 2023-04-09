import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            {currentUser === null ? (
              <Link className="link" to="/login">
                <div className="content">
                  <h1>{post.title}</h1>
                  <p className="degree">Minimal Lulusan {post.pendidikan}</p>
                  <p className="pendaftaran">
                    Pendaftaran: {moment(post.startDate).format("DD MMM YYYY")}{" "}
                    - {moment(post.finishDate).format("DD MMM YYYY")}
                  </p>
                  <p>Kuota kandidat : {post.kandidat}</p>
                </div>
                <p className="job">
                  Job Desc: <br></br>{" "}
                </p>
                <p>{getText(post.description.substring(0, 300))}</p>
                <button>Selengkapnya</button>
              </Link>
            ) : (
              <Link className="link" to={`/post/${post.id}`}>
                <div className="content">
                  <h1>{post.title}</h1>
                  <p className="degree">Minimal Lulusan {post.pendidikan}</p>
                  <p className="pendaftaran">
                    Pendaftaran: {moment(post.startDate).format("DD MMM YYYY")}{" "}
                    - {moment(post.finishDate).format("DD MMM YYYY")}
                  </p>
                  <p>Kuota kandidat : {post.kandidat}</p>
                </div>
                <p className="job">
                  Job Desc: <br></br>{" "}
                </p>
                <p>{getText(post.description.substring(0, 300))}</p>
                <button>Selengkapnya</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
