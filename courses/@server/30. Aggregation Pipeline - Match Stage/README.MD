# Aggregate Pipeline - Math Stage
```js
jobsController.js

import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
/**
 * showStats - Show Stats
 * @stats : await Job.aggregate([match])
 * @match : {createdBy: mongoosee.Types.ObjectId(req.user.id)}
 * @aggregate : Aggregate constructor used for building aggregation pipelines. Do not instantiate this class directly, use Model.aggregate() instead.
 */
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
  ]);
  res.status(StatusCodes.OK).json({ stats });
};

```