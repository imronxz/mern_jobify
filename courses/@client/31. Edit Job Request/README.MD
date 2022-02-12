# Edit Job Front End
**Context**
```js
actions.js

// TODO: Edit Job
export const EDIT_JOB = 'EDIT_JOB';
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
export const EDIT_JOB_FAILED = 'EDIT_JOB_FAILED';
```
```js
appContext.js

//! Edit Job
  const editJob = async () => {
    dispatch({ type: EDIT_JOB })
    try {
      const { position, company, jobLocation, jobType, status } = state
      
      await API.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return 
      dispatch({
        type: EDIT_JOB_FAILED,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  }
```
```js
reducer.js

    /* TODO: EDIT JOB */
    case EDIT_JOB:
      return { ...state, isLoading: true };
    case EDIT_JOB_SUCCESS:
      return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: 'Berhasil Edit Pekerjaan', };
    case EDIT_JOB_FAILED:
      return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg }
```
**pages/dashboard**
```js
AddJob.js

const AddJob = () => { editJob } = useAppContext();

    if (isEditing) {
      editJob();
      return
    }
    createJob()
```