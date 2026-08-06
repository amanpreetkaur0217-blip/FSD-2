import { useAuth } from "../context/AuthContext";
import Admin from "./Admin";
import Editor from "./Editor";
import Viewer from "./Viewer";

function Dashboard() {

    const { user } = useAuth();

    if (!user) {
        return <h2>Please Login</h2>;
    }

    switch (user.role) {

        case "Admin":
            return <Admin />;

        case "Editor":
            return <Editor />;

        case "Viewer":
            return <Viewer />;

        default:
            return <h2>Unauthorized</h2>;
    }
}

export default Dashboard;