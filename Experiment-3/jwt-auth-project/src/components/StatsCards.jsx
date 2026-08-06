import { useUsers } from "../context/UserContext";

function StatsCards() {
    const {
        totalUsers,
        totalAdmins,
        totalEditors,
        totalViewers,
    } = useUsers();

    return (
        <div className="stats-container">

            <div className="card">
                <h3>Total Users</h3>
                <h2>{totalUsers}</h2>
            </div>

            <div className="card">
                <h3>Admins</h3>
                <h2>{totalAdmins}</h2>
            </div>

            <div className="card">
                <h3>Editors</h3>
                <h2>{totalEditors}</h2>
            </div>

            <div className="card">
                <h3>Viewers</h3>
                <h2>{totalViewers}</h2>
            </div>

        </div>
    );
}

export default StatsCards;