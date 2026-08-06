import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import RoleFilter from "../components/RoleFilter";
import UserTable from "../components/UserTable";

function Viewer() {
    return (
        <>
            <Navbar />

            <div className="dashboard">
                <h1>👀 Viewer Dashboard</h1>

                <StatsCards />

                <div className="toolbar">
                    <SearchBar />
                    <RoleFilter />
                </div>

                <UserTable
                    canEdit={false}
                    canDelete={false}
                />
            </div>
        </>
    );
}

export default Viewer;