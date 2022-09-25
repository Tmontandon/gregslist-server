import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";


export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      // TODO v why different than job id
      .put('/:id', this.editJob)
      // TODO   v What to put here
      .delete('/:id', this.removeJob)
  }

  async removeJob(req, res, next) {
    try {
      // TODO understand how to remove a job
      const filteredJobs = await jobsService.removeJob(req.params.id)
      res.send(filteredJobs)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJob(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }

  }

  async editJob(req, res, next) {
    try {
      // REVIEW ([Junk from inputed data], [the info from user thats logged in --- Based off bearer key!])
      const job = await jobsService.editJob(req.body, req.userInfo)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const formData = req.body
      // REVIEW line 28 here is responsible for line 15 on the model....it will cast the account id for whoever the user logged in
      req.body.posterId = req.userInfo.id

      const createdJob = await jobsService.createJob(formData)
      res.send(createdJob)
    } catch (error) {
      next(error)
    }
  }
}