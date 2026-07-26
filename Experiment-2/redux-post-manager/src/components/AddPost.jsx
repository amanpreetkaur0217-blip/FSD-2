import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/posts/postSlice";

function AddPost() {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState("Twitter");

    const handleSubmit = () => {
        if (content.trim() === "") return;

        dispatch(
            addPost({
                id: Date.now(),
                content,
                platform,
            })
        );

        setContent("");
        setPlatform("Twitter");
    };

    return (
        <div className="add-post">
            <h2>✍️ Create New Post</h2>

            <input
                type="text"
                placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <label className="label">Select Platform</label>

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option>Twitter</option>
                <option>LinkedIn</option>
                <option>Instagram</option>
            </select>

            <button onClick={handleSubmit}>
                ➕ Add Post
            </button>
        </div>
    );
}

export default AddPost;