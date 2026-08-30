import React, {
    useMemo,
} from "react";

import { useSelector } from "react-redux";

function MonitoringPanel() {

    const posts = useSelector(
        (state) => state.posts.posts
    );

    const lastAction = useSelector(
        (state) => state.posts.lastAction
    );

    /*
     * ==========================================
     * useMemo
     * ==========================================
     *
     * Calculates performance statistics.
     */

    const statistics = useMemo(() => {

        console.log(
            "⚡ useMemo: Calculating statistics"
        );

        const total = posts.length;

        const linkedin = posts.filter(
            (post) =>
                post.platform === "LinkedIn"
        ).length;

        const twitter = posts.filter(
            (post) =>
                post.platform === "Twitter"
        ).length;

        const instagram = posts.filter(
            (post) =>
                post.platform === "Instagram"
        ).length;

        return {
            total,
            linkedin,
            twitter,
            instagram,
        };

    }, [posts]);

    return (
        <section className="monitoring-panel">

            <div className="monitor-title">

                <div>
                    <h2>
                        ⚡ Performance Monitoring
                    </h2>

                    <p>
                        Application performance and optimization status
                    </p>
                </div>

                <span className="status">
                    ● OPTIMIZED
                </span>

            </div>

            <div className="monitor-grid">

                <div className="monitor-card">
                    <span>📊 Total Posts</span>

                    <strong>
                        {statistics.total}
                    </strong>
                </div>

                <div className="monitor-card">
                    <span>💼 LinkedIn</span>

                    <strong>
                        {statistics.linkedin}
                    </strong>
                </div>

                <div className="monitor-card">
                    <span>🐦 Twitter</span>

                    <strong>
                        {statistics.twitter}
                    </strong>
                </div>

                <div className="monitor-card">
                    <span>📸 Instagram</span>

                    <strong>
                        {statistics.instagram}
                    </strong>
                </div>

            </div>

            <div className="optimization-box">

                <h3>
                    🚀 Optimization Techniques
                </h3>

                <div className="optimization-list">

                    <div>
                        <span>React.memo</span>
                        <b>✓ ACTIVE</b>
                    </div>

                    <div>
                        <span>useMemo</span>
                        <b>✓ ACTIVE</b>
                    </div>

                    <div>
                        <span>useCallback</span>
                        <b>✓ ACTIVE</b>
                    </div>

                    <div>
                        <span>Redux State Management</span>
                        <b>✓ ACTIVE</b>
                    </div>

                </div>

            </div>

            <div className="last-action">

                <span>
                    🔄 Last Application Action
                </span>

                <strong>
                    {lastAction}
                </strong>

            </div>

        </section>
    );
}

export default MonitoringPanel;