import { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";

function UserForm({ editingUser, clearEdit }) {

    const { addUser, updateUser, users } = useUsers();

    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        role: "Viewer",
        department: "",
    });

    useEffect(() => {

        if (editingUser) {

            setForm(editingUser);

        }

    }, [editingUser]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (editingUser) {

            updateUser(form);

            clearEdit();

        } else {

            addUser({

                ...form,

                id:
                    users.length
                        ? Math.max(...users.map(u => u.id)) + 1
                        : 1

            });

        }

        setForm({
            name: "",
            username: "",
            password: "",
            email: "",
            role: "Viewer",
            department: "",
        });

    };

    return (

        <form className="user-form" onSubmit={handleSubmit}>

            <h2>

                {editingUser ? "Update User" : "Add User"}

            </h2>

            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
            />

            <input
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
            />

            <select
                name="role"
                value={form.role}
                onChange={handleChange}
            >

                <option>Admin</option>

                <option>Editor</option>

                <option>Viewer</option>

            </select>

            <button>

                {editingUser ? "Update" : "Add"}

            </button>

        </form>

    );

}

export default UserForm;