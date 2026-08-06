import { useState } from "react";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import RoleFilter from "../components/RoleFilter";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function Admin() {
    const [editingUser, setEditingUser] = useState(null);

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <h1>👑 Admin Dashboard</h1>

                <StatsCards />

                <div className="toolbar">
                    <SearchBar />
                    <RoleFilter />
                </div>

                <UserForm
                    editingUser={editingUser}
                    clearEdit={() => setEditingUser(null)}
                />

                <UserTable
                    onEdit={setEditingUser}
                    canEdit={true}
                    canDelete={true}
                />
            </div>
        </>
    );
}

export default Admin;