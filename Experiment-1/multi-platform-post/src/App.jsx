import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");

  // Load drafts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  // Save drafts
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  // Character limit check
  const hasError = platform && text.length > limits[platform];

  // Show temporary message
  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Save Draft
  const saveDraft = () => {
    if (text.trim() === "") {
      showMessage("❌ Write something first!");
      return;
    }

    const draft = {
      text,
      platform,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (editIndex !== null) {
      const updated = [...drafts];
      updated[editIndex] = draft;
      setDrafts(updated);
      setEditIndex(null);
    } else {
      setDrafts([...drafts, draft]);
    }

    showMessage("✅ Draft Saved Successfully!");

    setText("");
    setPlatform("");
  };

  // Edit Draft
  const editDraft = (index) => {
    setText(drafts[index].text);
    setPlatform(drafts[index].platform);
    setEditIndex(index);
  };

  // Delete Draft
  const deleteDraft = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (confirmDelete) {
      const updated = drafts.filter((_, i) => i !== index);
      setDrafts(updated);
    }
  };

  // Publish
  const publishPost = () => {
    if (text.trim() === "") {
      showMessage("❌ Write a post first!");
      return;
    }

    if (!platform) {
      showMessage("❌ Select a platform!");
      return;
    }

    if (hasError) {
      showMessage("❌ Character limit exceeded!");
      return;
    }

    showMessage("✅ Post Published Successfully!");

    setText("");
    setPlatform("");
  };

  return (
    <div className="container">
      <h1>📢 Multi Platform Post Composer</h1>

      {message && <div className="message">{message}</div>}

      <div className="card">
        <h3>Select Platform</h3>

        <select
          className="dropdown"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select Platform</option>
          <option value="Twitter">Twitter</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Instagram">Instagram</option>
        </select>

        <textarea
          className={hasError ? "errorBox" : ""}
          placeholder="Write your post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {platform && (
          <div className="counter">
            <p className={hasError ? "red" : "green"}>
              <b>{platform}</b> : {text.length} / {limits[platform]}
            </p>

            <small>
              Remaining : {Math.max(0, limits[platform] - text.length)}
            </small>
          </div>
        )}

        {hasError && (
          <div className="warning">
            ⚠ {platform} limit exceeded by{" "}
            {text.length - limits[platform]} characters.
          </div>
        )}

        <div className="buttons">
          <button onClick={saveDraft}>
            {editIndex !== null ? "Update Draft" : "Save Draft"}
          </button>

          <button
            onClick={publishPost}
            disabled={hasError}
            className={hasError ? "disabled" : ""}
          >
            Publish
          </button>
        </div>
      </div>

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No Drafts Saved</p>
      ) : (
        drafts.map((draft, index) => (
          <div className="draftCard" key={index}>
            <p>{draft.text}</p>

            <small>
              <b>Platform:</b> {draft.platform}
            </small>

            <br />

            <small>
              <b>Saved:</b> {draft.date}
            </small>

            <div className="draftButtons">
              <button onClick={() => editDraft(index)}>Edit</button>

              <button onClick={() => deleteDraft(index)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;