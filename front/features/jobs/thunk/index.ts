import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit"
import { JobState } from "../types"
import { fetchJobs } from "./fetchJobs"
import { fetchJobById } from "./fetchJobById"

export const extraReducers = (builder: ActionReducerMapBuilder<JobState>) => {
  builder.addMatcher(isAnyOf(fetchJobs.fulfilled), (state, action) => {
    state.jobs = action.payload.jobs
  })
  builder.addMatcher(isAnyOf(fetchJobs.pending), (state) => {
    state.isLoading = true
  })
  builder.addMatcher(
    isAnyOf(fetchJobs.rejected, fetchJobs.fulfilled),
    (state) => {
      state.isLoading = false
    },
  )
  builder.addMatcher(isAnyOf(fetchJobById.fulfilled), (state, action) => {
    state.selectedJob = action.payload.job
    state.selectedJobLoading = false
  })
  builder.addMatcher(isAnyOf(fetchJobById.pending), (state) => {
    state.selectedJobLoading = true
  })
  builder.addMatcher(isAnyOf(fetchJobById.rejected), (state) => {
    state.selectedJobLoading = false
  })
}
