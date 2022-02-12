# Delete Job by userId and CreatedBy Methods
**Context**
```js
actions.js

// TODO: Delete Job
export const DELETE_JOB = 'DELETE_JOB';
```
```js
appContext.js

const deleteJob = async (jobId) => {
  dispatch({ type: DELETE_JOB })
  try {
    await authFetch.delete(`/jobs/${jobId}`)
    getJobs()
  } catch (error) {
    logoutUser()
  }
}
```
```js
reducer.js

    /* TODO: DELETE JOB */
    case DELETE_JOB:
      return { ...state, isLoading: true}
```