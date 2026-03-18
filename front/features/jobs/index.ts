import {
  useAppDispatch,
  useAppSelector,
} from "@/components/hooks/useReduxTypes"
import { useCallback, useEffect } from "react"
import { RootState } from "@/store"
import { fetchJobs } from "./thunk/fetchJobs"

export const useJobs = () => {
  const dispatch = useAppDispatch()

  const { jobs, isLoading } = useAppSelector((state: RootState) => state.job)

  const homeStage = jobs.slice(0, 6)

  const handleFetchJobs = useCallback(async () => {
    await dispatch(fetchJobs()).unwrap()
  }, [dispatch])

  useEffect(() => {
    if (jobs.length === 0) handleFetchJobs()
  }, [jobs.length, handleFetchJobs])

  return { homeStage, isLoading, handleFetchJobs, jobs }
}
