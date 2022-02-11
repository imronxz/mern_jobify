# Create Job 
***REACT CONTEXT***
```js
actions.js

export const CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN'
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS'
export const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR'
```
```js
appContext.js

const createJob = async () => {
  dispatch({ type: CREATE_JOB_BEGIN })
  try {
    const { position, company, jobLocation, jobType, status } = state

    await authFetch.post('/jobs', {
      company,
      position,
      jobLocation,
      jobType,
      status,
    })
    dispatch({
      type: CREATE_JOB_SUCCESS,
    })
    // call function instead clearValues()
    dispatch({ type: CLEAR_VALUES })
  } catch (error) {
    if (error.response.status === 401) return
    dispatch({
      type: CREATE_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    })
  }
  clearAlert()
}
```
```js
reducer.js

if (action.type === CREATE_JOB_BEGIN) {
  return { ...state, isLoading: true }
}
if (action.type === CREATE_JOB_SUCCESS) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'success',
    alertText: 'New Job Created!',
  }
}
if (action.type === CREATE_JOB_ERROR) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  }
}
```
- pages/dashboard/AddJob.js
```js
AddJob.js

const { createJob } = useAppContext()

const handleSubmit = (e) => {
  e.preventDefault()
  // while testing

  // if (!position || !company || !jobLocation) {
  //   displayAlert()
  //   return
  // }
  if (isEditing) {
    // eventually editJob()
    return
  }
  createJob()
}
```
