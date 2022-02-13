# Aggregation Pipeline - Default Stats
```js
/**
 * showStats - Show Stats
 * @aggregate : Aggregate constructor used for building aggregation pipelines. Do not instantiate this class directly, use Model.aggregate() instead.
 * @stats : await Job.aggregate([match])
 * @match : {createdBy: mongoosee.Types.ObjectId(req.user.id)}
 * @group : {_id: '$status', count: {$sum: 1}}
 * @statsToObject
  ```js 
    stats = stats.reduce((acc, cur) => {
      const {_id: title, count} = curr
      acc[title] = count
      return acc
    })```
 * @defaultStats
  ```js
    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    }```
 */
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    //* Jumlah status
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  //* convert stats from an Array to Object with reduce Object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  
  //* Default stats for other User
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplication = []
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };

```