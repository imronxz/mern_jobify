import Job from '../models/Job.js';
import mongoose from 'mongoose';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

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
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
/**
 * updateJob - Update Job
 * @params : {id: jobId}
 * @body : {position, company}
 * @job : await Job.findOne({ _id: jobId})
 * @updateJob : await Job.findByIdAndUpdate({ _id: jobId}, req.body, { new: true,runValidators: true,)
 */
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Harap pilih posisi dan perusahaan');
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`Job tidak ditemukan :${jobId}`);
  }

  //* check permission POST by id
  // console.log(typeof req.user.id);
  // console.log(typeof job.createdBy)
  checkPermissions(req.user, job.createdBy);

  const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updateJob });
};

/**
 * deleteJob - Delete Job
 * @params : {id: jobId}
 * @job : await Job.findOne({ _id: jobId})
 * @checkPermissions : checkPermissions(req.user, job.createdBy)
 * @remove : job.remove()
 */
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) throw new NotFoundError(`Job tidak ditemukan :${jobId}`);

  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Job Removed' });
};

/**
 * showStats - Show Stats
 * @aggregate : Aggregate constructor used for building aggregation pipelines. Do not instantiate this class directly, use Model.aggregate() instead.
 * @stats : await Job.aggregate([match])
 * @match : {createdBy: mongoosee.Types.ObjectId(req.user.id)}
 */
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    //* Jumlah status
    { $group: { _id: '$status', count: {$sum: 1}}}
  ]);
  //* convert stats from an Array to Object with reduce Object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count;
    return acc
  })

  res.status(StatusCodes.OK).json({ stats });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
