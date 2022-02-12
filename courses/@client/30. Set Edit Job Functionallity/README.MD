# Set Edit Job Functionality
***context***
```js
actions.js
export const EDIT_JOB = 'EDIT_JOB'
```
```js
appContext.js

const setEditJob = (id) => {
  dispatch({ type: SET_EDIT_JOB, payload: { id } })
}
const editJob = () => {
  console.log('edit job')
}
value={{editJob}}
```
```js
reducer.js

if (action.type === SET_EDIT_JOB) {
  const job = state.jobs.find((job) => job._id === action.payload.id)
  const { _id, position, company, jobLocation, jobType, status } = job
  return {
    ...state,
    isEditing: true,
    editJobId: _id,
    position,
    company,
    jobLocation,
    jobType,
    status,
  }
}
```
***components***
```js
Jobs.js
  <footer>
    <div className="actions">
      <Link to="/tambah-pekerjaan" className="btn edit-btn" onClick={() => setEditJob(_id)}>
        Edit
      </Link>
      <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>
        Delete
      </button>
    </div>
  </footer>
```
***pages/dashboard***
```js
AddJob.js
const { isEditing, editJob } = useAppContext()
const handleSubmit = (e) => {
  e.preventDefault()

  if (!position || !company || !jobLocation) {
    displayAlert()
    return
  }
  if (isEditing) {
    editJob()
    return
  }
  createJob()
}
```