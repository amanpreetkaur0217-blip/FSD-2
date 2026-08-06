import { useState } from "react";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import RoleFilter from "../components/RoleFilter";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function Editor() {
    const [editingUser, setEditingUser] = useState(null);

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <h1>✏️ Editor Dashboard</h1>

                <StatsCards />

                <div className="toolbar">
                    <SearchBar />
                    <RoleFilter />
                </div>

                {/* Show form only when editing */}
                {editingUser && (
                    <UserForm
                        editingUser={editingUser}
                        clearEdit={() => setEditingUser(null)}
                    />
                )}

                <UserTable
                    onEdit={setEditingUser}
                    canEdit={true}
                    canDelete={false}
                />
            </div>
        </>
    );
}

export default Editor;