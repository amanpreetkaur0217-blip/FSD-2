import { createSelector } from "@reduxjs/toolkit";

export const selectPosts = (state) => state.posts.posts;

export const selectSearch = (_, search) => search;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearch],

    (posts, search) => {
        return posts.filter((post) =>
            post.content.toLowerCase().includes(search.toLowerCase())
        );
    }
);