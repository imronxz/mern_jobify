# Jobs Controller 
**getAllJobs**
```js
jobsController.js

/**
 * getAllJob - Get All Job
 * @job : await Job.find(createdBy: req.user.id)
 * @response : status(StatusCodes.Ok).json({ jobs, totalJobs: jobs.legthm numOfPages: 1})
 */
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

```