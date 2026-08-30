import React, {
  useCallback,
  useRef,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import PostForm from "./components/PostForm";
import Calendar from "./components/Calendar";
import PostCard from "./components/PostCard";
import MonitoringPanel from "./components/MonitoringPanel";
import RenderMonitor from "./components/RenderMonitor";

import { deletePost } from "./redux/postSlice";

import "./App.css";


function App() {

  const dispatch = useDispatch();

  // Track App component renders
  const renderCount = useRef(0);

  renderCount.current += 1;

  // Get posts from Redux
  const posts = useSelector(
    (state) => state.posts.posts
  );


  /*
   * ==========================================
   * useCallback
   * ==========================================
   *
   * Keeps the delete function reference stable.
   * This helps prevent unnecessary child
   * re-renders when used with React.memo.
   */

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );


  return (
    <div className="app">

      {/* =====================================
          HEADER
          ===================================== */}

      <header className="header">

        <div>

          <h1>
            📅 Social Media Scheduler
          </h1>

          <p>
            Schedule • Drag • Optimize • Monitor
          </p>

        </div>

      </header>


      <main>

        {/* =====================================
            TOP SECTION
            ===================================== */}

        <section className="top-section">

          {/* POST FORM */}

          <PostForm />


          {/* =================================
              SCHEDULED POST LIST
              ================================= */}

          <div className="post-list">

            <div className="section-title">

              <div>

                <h2>
                  📝 Scheduled Posts
                </h2>

                <p>
                  {posts.length} posts scheduled
                </p>

              </div>

            </div>


            {/* Render each post */}

            {posts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
              />

            ))}

          </div>

        </section>


        {/* =====================================
            INTERACTIVE CALENDAR
            ===================================== */}

        <Calendar />


        {/* =====================================
            RENDER MONITOR
            ===================================== */}

        <RenderMonitor
          renderCount={renderCount.current}
        />


        {/* =====================================
            PERFORMANCE MONITORING
            ===================================== */}

        <MonitoringPanel />


      </main>


      {/* =====================================
          FOOTER
          ===================================== */}

      <footer>

        <p>
          Interactive Calendar • Drag & Drop •
          React Optimization • Performance Monitoring
        </p>

      </footer>

    </div>
  );
}


export default App;