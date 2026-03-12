import { Application } from "../moduls/application.module.js"

const createApplication = async (req, res) => {
  try {
    const { job } = req.body
    const applicant = req.user._id
    if (!job || !applicant) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields." })
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
    const application = await Application.findOne({
      _id: id,
      applicant: req.user._id,
    })
    if (!application) {
      return res.status(404).json({ message: "Application not found." })
    }
    await Application.findByIdAndDelete(id)
    res.status(200).json({ message: "Application deleted successfully." })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error.", err })
  }
}

export { createApplication, getApplications, deleteApplication }
