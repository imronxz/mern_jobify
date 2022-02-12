# Check Permission for updating by user.id
```js
jobsControllers.js

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
  console.log(typeof req.user.id);
  console.log(typeof job.createdBy)

  checkPermissions(req.user, job.createdBy)

  const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updateJob})
};
```
#### utils/checkPermission.js
```js
checkPermission.js

import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.id === resourceUserId.toString()) return
  throw new UnAuthenticatedError('You do not have permission to do that')
};

export default checkPermissions;
```