import { useUsers } from "../context/UserContext";

function UserTable({
    onEdit,
    canEdit = false,
    canDelete = false,
}) {
    const { filteredUsers, deleteUser } = useUsers();

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmDelete) {
            deleteUser(id);
        }
    };

    return (
        <div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>

                        {(canEdit || canDelete) && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`badge ${user.role.toLowerCase()}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>{user.department}</td>

                            {(canEdit || canDelete) && (
                                <td>
                                    {canEdit && (
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(user)}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {canDelete && (
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;