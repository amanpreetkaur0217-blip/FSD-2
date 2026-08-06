import { createContext, useContext, useMemo, useState } from "react";
import initialUsers from "../data/users";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState(initialUsers);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedRole, setSelectedRole] = useState("All");

    // CREATE
    const addUser = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    };

    // UPDATE
    const updateUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    // DELETE
    const deleteUser = (id) => {
        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    // SEARCH + FILTER
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole =
                selectedRole === "All" || user.role === selectedRole;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, selectedRole]);

    // STATISTICS
    const totalUsers = users.length;

    const totalAdmins = users.filter(
        (u) => u.role === "Admin"
    ).length;

    const totalEditors = users.filter(
        (u) => u.role === "Editor"
    ).length;

    const totalViewers = users.filter(
        (u) => u.role === "Viewer"
    ).length;

    return (
        <UserContext.Provider
            value={{
                users,
                filteredUsers,

                addUser,
                updateUser,
                deleteUser,

                searchTerm,
                setSearchTerm,

                selectedRole,
                setSelectedRole,

                totalUsers,
                totalAdmins,
                totalEditors,
                totalViewers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUsers = () => useContext(UserContext);