# Job Controllers - Delete Job
**Delete Job**
```js
jobsControllers.js

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })

  if (!job) throw new NotFoundError(`Job tidak ditemukan :${jobId}`)

  checkPermissions(req.user, job.createdBy)
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Job Removed'})
};
```