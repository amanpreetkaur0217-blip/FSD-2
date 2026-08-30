import React, { useRef } from "react";

const RenderMonitor = React.memo(function RenderMonitor() {

    const renderCount = useRef(0);

    renderCount.current += 1;

    console.log(
        "🟣 RenderMonitor rendered:",
        renderCount.current
    );

    return (
        <div className="render-monitor">

            <div>
                <h3>🔍 Render Monitor</h3>

                <p>
                    Tracks component rendering
                </p>
            </div>

            <div className="render-count">
                {renderCount.current}
            </div>

            <span>
                renders
            </span>

        </div>
    );
});

export default RenderMonitor;