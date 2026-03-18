import { UserTypes } from "../users/types"

export type JobTypes = {
  _id: string
  title: string
  description: string
  salary?: number
  location?: string
  type?: "full-time" | "part-time" | "remote"
  skills?: string[]
  deadline?: string
  employer: UserTypes
  createdAt: string
  updatedAt: string
}

export type Job = {
  _id: string
  title: string
  description: string
  location?: string
  salary?: number
  type?: string
  skills?: string[]
  deadline?: string
  employer?: { username: string; email: string }
}

export type JobState = {
  jobs: JobTypes[]
  isLoading: boolean
}