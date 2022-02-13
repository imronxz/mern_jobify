# Aggregation Pipeline - Grout Stage & conver stats to an Object with reduce
```js
jobsController.js

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
```