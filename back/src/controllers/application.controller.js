import { Application } from "../moduls/application.module.js"
import { Job } from "../moduls/job.module.js"

const createApplication = async (req, res) => {
  try {
    const { job, CV } = req.body
    const applicant = req.user._id
    
    if (!job || !applicant) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." })
    }
    const existingApplication = await Application.findOne({ job, applicant })

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job." })
    }
    
    const application = await Application.create({
      job,
      applicant,
    })
    res
      .status(201)
      .json({ message: "Application created successfully.", application })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error: ", err })
  }
}

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
    res
      .status(200)
      .json({ message: "Applications retrieved successfully.", applications })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error.", err })
  }
}

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    
    let application

    if (req.user.role === "seeker") {
      // seeker can only delete their own
      application = await Application.findOne({ 
        _id: id, 
        applicant: req.user._id 
      })
    } else if (req.user.role === "employer") {
      // employer can delete from their job
      application = await Application.findById(id)
        .populate("job")
      // check job belongs to employer
      if (application?.job.employer.toString() !== req.user._id.toString()) {
        application = null
      }
    }

    if (!application) return res.status(404).json({ message: "Application not found." })
    await Application.findByIdAndDelete(id)
    res.status(200).json({ message: "Application deleted successfully." })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const updateApplication = async (req, res) => {
  try {
    const { status } = req.body
    const application = await Application.findOne({
      _id: req.params.id,
    })

    if (!application)
      return res.status(404).json({ message: "Application not found." })

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    )
    res.status(200).json({ application: updatedApplication })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job", "title location salary")
      .populate("applicant", "username email")
    if (!application)
      return res.status(404).json({ message: "Application not found." })
    res.status(200).json({ application })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      Ò: req.user._id,
    })
    if (!job) return res.status(404).json({ message: "Job not found." })

    const applications = await Application.find({
      job: req.params.id,
    }).populate("applicant", "username email")

    res.status(200).json({ applications })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export {
  createApplication,
  getApplications,
  deleteApplication,
  updateApplication,
  getApplication,
  getJobApplications,
}
