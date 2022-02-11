import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * createJob - Create Job
 * @body : {position, company}
 * @createdBy : {userId}
 * @job : await Job.create(req.body)
 */
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Harap pilih posisi dan perusahaan');
  }

  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

/**
 * getAllJob - Get ALl Job
 * @job : await Job.find(createdBy: req.user.id)
 * @response : status(StatusCodes.Ok).json({ jobs, totalJobs: jobs.legthm numOfPages: 1})
 */
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const deleteJob = async (req, res) => {
  res.send('deleteJob ');
};
const updateJob = async (req, res) => {
  res.send('update Job ');
};
const showStats = async (req, res) => {
  res.send('show Stats ');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
