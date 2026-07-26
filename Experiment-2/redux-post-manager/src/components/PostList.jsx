import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts/postSlice";
import { selectFilteredPosts } from "../redux/posts/selectors";

function PostList({ search }) {

    const dispatch = useDispatch();

    const posts = useSelector((state) =>
        selectFilteredPosts(state, search)
    );

    if (posts.length === 0)
        return <p className="no-posts">No Posts Found</p>;

    return (
        <div className="post-list">

            <h2>All Posts</h2>

            {posts.map((post) => (

                <div
                    className={`post-card ${search &&
                            post.content.toLowerCase().includes(search.toLowerCase())
                            ? "highlight"
                            : ""
                        }`}
                    key={post.id}
                >

                    <span
                        className={`platform ${post.platform.toLowerCase()}`}
                    >
                        {post.platform}
                    </span>

                    <p>📝 {post.content}</p>

                    <button
                        className="delete-btn"
                        onClick={() => dispatch(deletePost(post.id))}
                    >
                        🗑 Delete
                    </button>

                </div>

            ))}

        </div>
    );
}

export default PostList;