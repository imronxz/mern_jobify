#### Create Job

```js
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Harap pilih posisi dan perusahaan');
  }

  req.body.createdBy = req.user.id;

  console.log(req.body.createdBy);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
```