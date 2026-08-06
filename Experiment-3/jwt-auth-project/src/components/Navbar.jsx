import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="logo">
                JWT User Management System
            </div>

            <div className="user-info">

                <span>
                    Welcome, <b>{user?.name}</b>
                </span>

                <span className="role">
                    {user?.role}
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;