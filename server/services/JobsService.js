import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {

  async removeJob(id) {

  }

  async editJob(jobData, userInfo) {
    const job = await this.getJob(jobData.id)
    if (userInfo != job.posterId.toString()) {
      throw new Forbidden("bruh get outta here")
    }

    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.jobSalary = jobData.jobSalary || job.jobSalary
    job.jobCompany = jobData.jobCompany || job.jobCompany
    job.jobHours = jobData.jobHours || job.jobHours
    job.jobDesc = jobData.jobDesc || job.jobDesc

    await job.save()

    return job
  }
  async getJob(carId) {
    // REVIEW adding the content from poster to the content of the object
    // REVIEW adding in specific details form selected(poster) collectiom   vvvv
    const job = await dbContext.Jobs.findById(carId).populate('poster', 'name picture email')
    if (!job) {
      throw new BadRequest('Bad Car Id')
    }
    return job
  }
  async createJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }

  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}
export const jobsService = new JobsService