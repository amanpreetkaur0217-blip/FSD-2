import { useState } from "react";
import { useSelector } from "react-redux";

import "./App.css";

import AddPost from "./components/AddPost";
import SearchBar from "./components/SearchBar";
import PostList from "./components/PostList";

function App() {

  const [search, setSearch] = useState("");

  const posts = useSelector((state) => state.posts.posts);

  const twitter = posts.filter(
    p => p.platform === "Twitter"
  ).length;

  const linkedin = posts.filter(
    p => p.platform === "LinkedIn"
  ).length;

  const instagram = posts.filter(
    p => p.platform === "Instagram"
  ).length;

  return (

    <div className="container">

      <h1>Multi-Platform Post Manager</h1>

      <div className="stats">

        <div className="card">
          <h2>{posts.length}</h2>
          <p>Total Posts</p>
        </div>

        <div className="card">
          <h2>{twitter}</h2>
          <p>Twitter</p>
        </div>

        <div className="card">
          <h2>{linkedin}</h2>
          <p>LinkedIn</p>
        </div>

        <div className="card">
          <h2>{instagram}</h2>
          <p>Instagram</p>
        </div>

      </div>

      <AddPost />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      <p className="search-info">
        Searching for:
        <b> {search || "Nothing"}</b>
      </p>

      <PostList search={search} />

    </div>

  );

}

export default App;