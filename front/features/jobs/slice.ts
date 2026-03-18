import { createSlice } from "@reduxjs/toolkit"
import { JobState } from "./types"
import { extraReducers } from "./thunk"

const initialState: JobState = {
    jobs: [],
    isLoading: false,
}


export const jobsSlice = createSlice({
    name: "job",
    initialState,
    reducers: {},
    extraReducers,
})

export const jobsActions = jobsSlice.actions
export default jobsSlice.reducer
