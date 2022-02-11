import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Harap pilih posisi dan perusahaan');
  }

  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  res.send('deleteJob ');
};
const getAllJobs = async (req, res) => {
  res.send('get All Jobs ');
};
const updateJob = async (req, res) => {
  res.send('update Job ');
};
const showStats = async (req, res) => {
  res.send('show Stats ');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
