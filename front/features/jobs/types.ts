export type Job = {
  _id: string
  title: string
  description: string
  location?: string
  salary?: number
  type?: string
  skills?: string[]
  deadline?: string
  employer?: { username: string; email: string },
  createdAt?: string
  updatedAt?: string
}

export type JobState = {
  jobs: Job[]
  isLoading: boolean
}