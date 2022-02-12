# Jobs Controller - controllers/jobsControllers.js
```js
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

  // check permission

  const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updateJob})
};

```