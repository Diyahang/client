import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Write = () => {
  const getInitialState = () => {
    const pendidikan = "Pendidikan";
    return pendidikan;
  };

  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [kandidat, setKandidat] = useState(state?.kandidat || "");
  const [pendidikan, setPendidikan] = useState(
    getInitialState,
    state?.pendidikan || ""
  );
  const [startDate, setStartDate] = useState(
    state?.startDate.substring(0, 10) || ""
  );
  const [finishDate, setfinishDate] = useState(
    state?.finishDate.substring(0, 10) || ""
  );
  const [value, setValue] = useState(state?.description || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            kandidat,
            pendidikan,
            startDate,
            finishDate,
            description: value,
          })
        : await axios.post(`/posts`, {
            title,
            kandidat,
            pendidikan,
            startDate,
            finishDate,
            description: value,
            created: moment(Date.now()).format(),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange2 = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setKandidat(onlyNums);
  };

  console.log(value);
  console.log(kandidat);
  console.log(pendidikan);
  console.log(startDate);
  console.log(finishDate);
  console.log(title);
  return (
    <div className="add">
      <div className="content">
        <div className="content1">
          <label>Posisi</label>
          <input
            type="text"
            placeholder="Posisi Pekerjaan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Jumlah kandidat</label>
          <input
            type="text"
            placeholder="Jumlah Kandidat"
            value={kandidat}
            onChange={(e) => handleChange2(e)}
          />
          <label>Pendidikan</label>
          <select
            value={pendidikan}
            onChange={(e) => {
              setPendidikan(e.target.value);
            }}
            className="pendidikan"
          >
            <option value="N/A">Pendidikan</option>
            <option value="SMP">SMP</option>
            <option value="SMA/SMK">SMA/SMK</option>
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
          </select>
        </div>
        <div className="content2">
          <div className="tanggal">
            <label>Pendaftaran </label>
            <br />
            <input
              value={startDate}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              name="data_range_from[]"
            />{" "}
            -{" "}
            <input
              value={finishDate}
              type="date"
              onChange={(e) => setfinishDate(e.target.value)}
              name="data_range_to[]"
            />
          </div>
        </div>
        <div className="editorContainer">
          <label>Deskripsi Pekerjaan</label>
          <ReactQuill
            className="isi"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
