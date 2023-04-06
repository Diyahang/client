import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [posts, setPosts] = useState([]);

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

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Teknisi IT",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     kuota: 4,
  //     startReq: "25/02/2023",
  //     finishReq: "30/02/2023",
  //     degree: "SMA",
  //   },
  //   {
  //     id: 2,
  //     title: "Backend Developer",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     kuota: 2,
  //     startReq: "25/02/2023",
  //     finishReq: "30/02/2023",
  //     degree: "S1",
  //   },
  //   {
  //     id: 3,
  //     title: "Frontend Developer",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     kuota: 3,
  //     startReq: "25/02/2023",
  //     finishReq: "30/02/2023",
  //     degree: "S1",
  //   },
  //   {
  //     id: 4,
  //     title: "Admin Accounting",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     kuota: 1,
  //     startReq: "25/02/2023",
  //     finishReq: "30/02/2023",
  //     degree: "SMA/S1",
  //   },
  // ];

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link" to={`/post/${post.id}`}>
              <div className="content">
                <h1>{post.title}</h1>
                <p className="degree">Minimal Lulusan {post.pendidikan}</p>
                <p className="pendaftaran">
                  Pendaftaran: {moment(post.startDate).format("DD MMM YYYY")} -{" "}
                  {moment(post.finishDate).format("DD MMM YYYY")}
                </p>
                <p>Kuota kandidat : {post.kandidat}</p>
              </div>
              <p className="job">
                Job Desc: <br></br>{" "}
              </p>
              <p className="desc">{post.description.substring(0, 300)}...</p>
              <button>Selengkapnya</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
