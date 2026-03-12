import { Job } from "../moduls/job.module.js"

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      skills,
      type,
      deadline,
    } = req.body
    const employer = req.user._id
    console.log("req", req.user)
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." })
    }
    const job = await Job.create({
      title,
      description,
      salary,
      location,
      skills,
      type,
      deadline, 
      employer
    })
    res.status(201).json({ message: "Job created successfully.", job })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    res.status(200).json({ message: "Jobs retrieved successfully.", jobs })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error.", err })
  }
}

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findOne({ _id: id })
    if (!job) {
      return res.status(404).json({ message: "Job not found." })
    }
    await Job.findByIdAndDelete(id)
    res.status(200).json({ message: "Job deleted successfully." })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error.", err })
  }
}

export { createJob, getJobs, deleteJob }
