import React, {
    useCallback,
    useMemo,
} from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useDispatch, useSelector } from "react-redux";

import { updatePostDate } from "../redux/postSlice";

function Calendar() {
    const dispatch = useDispatch();

    const posts = useSelector(
        (state) => state.posts.posts
    );

    /*
     * ==========================================
     * useMemo
     * ==========================================
     *
     * Converts Redux posts into FullCalendar events.
     *
     * This calculation only happens again
     * when posts change.
     */

    const events = useMemo(() => {
        console.log("⚡ useMemo: Calculating calendar events");

        return posts.map((post) => ({
            id: post.id,

            title: `${post.platform}: ${post.title}`,

            start: `${post.date}T${post.time}`,

            extendedProps: {
                platform: post.platform,
                postTitle: post.title,
            },
        }));
    }, [posts]);

    /*
     * ==========================================
     * DRAG & DROP
     * ==========================================
     */

    const handleEventDrop = useCallback(
        (info) => {
            console.log("🎯 DRAG & DROP DETECTED");

            const postId = info.event.id;

            const newDate = info.event.start
                .toISOString()
                .split("T")[0];

            const newTime = info.event.start
                .toTimeString()
                .slice(0, 5);

            console.log("Post ID:", postId);
            console.log("New Date:", newDate);
            console.log("New Time:", newTime);

            /*
             * Update Redux state
             */

            dispatch(
                updatePostDate({
                    id: postId,
                    date: newDate,
                    time: newTime,
                })
            );
        },
        [dispatch]
    );

    /*
     * ==========================================
     * CLICK EVENT
     * ==========================================
     */

    const handleEventClick = useCallback(
        (info) => {
            alert(
                `📌 Post Details\n\n` +
                `Title: ${info.event.extendedProps.postTitle}\n` +
                `Platform: ${info.event.extendedProps.platform}\n` +
                `Date: ${info.event.start.toLocaleString()}`
            );
        },
        []
    );

    return (
        <div className="calendar-container">

            <div className="calendar-heading">

                <div>
                    <h2>📅 Content Calendar</h2>

                    <p>
                        Drag any post to another date to reschedule it.
                    </p>
                </div>

                <div className="drag-badge">
                    🖱️ DRAG & DROP ENABLED
                </div>

            </div>

            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                ]}

                initialView="dayGridMonth"

                initialDate="2026-08-15"

                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right:
                        "dayGridMonth,timeGridWeek,timeGridDay",
                }}

                events={events}

                /*
                 * THIS ENABLES DRAGGING
                 */
                editable={true}

                /*
                 * Allows external dropping
                 */
                droppable={true}

                /*
                 * Called after an event is dragged
                 */
                eventDrop={handleEventDrop}

                /*
                 * Called when event is clicked
                 */
                eventClick={handleEventClick}

                height="650px"
            />

        </div>
    );
}

export default Calendar;