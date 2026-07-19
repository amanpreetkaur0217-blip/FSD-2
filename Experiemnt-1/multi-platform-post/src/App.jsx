import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const [text, setText] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const handlePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const hasError = platforms.some(
    (platform) => text.length > limits[platform]
  );

  const exceededPlatforms = platforms.filter(
    (platform) => text.length > limits[platform]
  );

  const saveDraft = () => {
    if (text.trim() === "") {
      showMessage("❌ Write something first!");
      return;
    }

    const draft = {
      text,
      platforms,
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
    setPlatforms([]);
  };

  const editDraft = (index) => {
    setText(drafts[index].text);
    setPlatforms(drafts[index].platforms);
    setEditIndex(index);
  };

  const deleteDraft = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (confirmDelete) {
      const updated = drafts.filter((_, i) => i !== index);
      setDrafts(updated);
    }
  };
  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const publishPost = () => {
    if (text.trim() === "") {
      showMessage("❌ Write a post first!");
      return;
    }

    if (platforms.length === 0) {
      showMessage("❌ Select at least one platform!");
      return;
    }

    if (hasError) {
      showMessage("❌ Cannot Publish! Character limit exceeded.");
      return;
    }

    showMessage("✅ Post Published Successfully!");

    setText("");
    setPlatforms([]);
  };

  return (
    <div className="container">

      <h1>📢 Multi Platform Post Composer</h1>

      {message && <div className="message">{message}</div>}

      <div className="card">

        <h3>Select Platform(s)</h3>

        <div className="dropdownContainer">

          <button
            type="button"
            className="dropdownBtn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {platforms.length === 0
              ? "Select Platform(s)"
              : platforms.join(", ")}

            ▼
          </button>

          {showDropdown && (
            <div className="dropdownMenu">

              {Object.keys(limits).map((platform) => (

                <label key={platform} className="menuItem">

                  <input
                    type="checkbox"
                    checked={platforms.includes(platform)}
                    onChange={() => handlePlatform(platform)}
                  />

                  {platform}

                </label>

              ))}

            </div>
          )}

        </div>

        <div className="selectedPlatforms">
          {platforms.map((platform) => (
            <span key={platform} className="tag">
              {platform}

              <button onClick={() =>
                setPlatforms(platforms.filter((p) => p !== platform))
              }>
                ×
              </button>

            </span>
          ))}
        </div>

        <textarea
          className={hasError ? "errorBox" : ""}
          placeholder="Write your post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="counter">

          {platforms.map((platform) => (

            <div key={platform}>

              <p className={text.length > limits[platform] ? "red" : "green"}>

                <b>{platform}</b>

                {" : "}

                {text.length} / {limits[platform]}

              </p>

              <small>

                Remaining :

                {Math.max(0, limits[platform] - text.length)}

              </small>

            </div>

          ))}

        </div>

        {hasError && (
          <div className="warning">
            {exceededPlatforms.map((platform) => (
              <p key={platform}>
                ⚠ {platform} limit exceeded by{" "}
                {text.length - limits[platform]} characters.
              </p>
            ))}
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
              <b>Platforms:</b> {draft.platforms.join(", ")}
            </small>

            <br />

            <small>
              <b>Saved:</b> {draft.date}
            </small>

            <div className="draftButtons">
              <button onClick={() => editDraft(index)}>
                Edit
              </button>

              <button onClick={() => deleteDraft(index)}>
                Delete
              </button>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default App;