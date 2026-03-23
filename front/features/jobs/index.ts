import {
  useAppDispatch,
  useAppSelector,
} from "@/components/hooks/useReduxTypes"
import { useCallback, useEffect } from "react"
import { RootState } from "@/store"
import { fetchJobs } from "./thunk/fetchJobs"
import { fetchJobById } from "./thunk/fetchJobById"
import { jobsActions } from "./slice"

export const useJobs = () => {
  const dispatch = useAppDispatch()

  const { jobs, isLoading, selectedJob, selectedJobLoading } = useAppSelector(
    (state: RootState) => state.job,
  )

  const homeStage = jobs.slice(0, 6)

  const handleFetchJobs = useCallback(async () => {
    await dispatch(fetchJobs()).unwrap()
  }, [dispatch])

  useEffect(() => {
    if (jobs.length === 0) handleFetchJobs()
  }, [jobs.length, handleFetchJobs])

  const handleFetchJobById = useCallback(
    async (id: string) => {
      await dispatch(fetchJobById(id))
    },
    [dispatch],
  )
const clearSelectedJob = useCallback(() => {
  dispatch(jobsActions.clearSelectedJob())
}, [dispatch])
  return {
    homeStage,
    isLoading,
    handleFetchJobs,
    jobs,
    handleFetchJobById,
    selectedJob,
    selectedJobLoading,
    clearSelectedJob,
  }
}
