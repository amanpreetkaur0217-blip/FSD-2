import { useUsers } from "../context/UserContext";

function SearchBar() {
    const { searchTerm, setSearchTerm } = useUsers();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by Name, Username or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;