function SearchBar({ search, setSearch }) {
    return (
        <div className="search-bar">

            <h2>🔍 Search Posts</h2>

            <input
                type="text"
                placeholder="Type any word from your post..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>
    );
}

export default SearchBar;