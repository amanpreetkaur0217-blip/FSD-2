import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = login(username, password);

        if (success) {
            navigate("/dashboard");
        } else {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>JWT Authentication System</h1>
                <h3>Login</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>

                <br />


            </div>
        </div>
    );
}

export default Login;