import { useUsers } from "../context/UserContext";

function RoleFilter() {
    const { selectedRole, setSelectedRole } = useUsers();

    return (
        <div className="role-filter">
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
            </select>
        </div>
    );
}

export default RoleFilter;