import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { JobState } from "../types";
import { fetchJobs } from "./fetchJobs";


export const extraReducers = (builder: ActionReducerMapBuilder<JobState>) => {
    builder.addMatcher(
        isAnyOf(
            fetchJobs.fulfilled,
        ),
        (state, action) => {
            state.jobs = action.payload.jobs
        },
    )
    builder.addMatcher(
        isAnyOf(
            fetchJobs.pending,
        ),
        (state) => {
            state.isLoading = true
        },
    )
    builder.addMatcher(
        isAnyOf(
            fetchJobs.rejected,
            fetchJobs.fulfilled,
        ),
        (state) => {
            state.isLoading = false
        },
    )
}