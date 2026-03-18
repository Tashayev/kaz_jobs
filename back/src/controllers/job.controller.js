import { createNewJob, deleteJobById, getAllJobs, getJobById, updateJobById } from "../services/job.service.js"

const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, skills, type, deadline, category } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: "Please provide all the required fields." })
    }
    const job = await createNewJob(
      { title, description, salary, location, skills, type, deadline, category },
      req.user._id
    )
    res.status(201).json({ job })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    const job = await deleteJobById(req.params.id, req.user._id)
    if (!job) return res.status(404).json({ message: "Job not found." })
    res.status(200).json({ message: "Job deleted successfully." })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getJob = async (req, res) => {
  try {
    const job = await getJobById(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found." })
    res.status(200).json({ job })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const updateJob = async (req, res) => {
  try {
    const job = await updateJobById(req.params.id, req.user._id, req.body)
    if (!job) return res.status(404).json({ message: "Job not found." })
    res.status(200).json({ job })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs(req.query)
    res.status(200).json({ jobs })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export { createJob, getJobs, deleteJob, getJob, updateJob }
