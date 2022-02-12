import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/AddJob';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  //! TODO: on submit form job
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: validate form
    /* if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    } */

    if (isEditing) {
      editJob();
      return
    }
    createJob()
  }

  //! TODO: on change input event target
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value})
  };

  const handleClearValues = (e) => {
    e.preventDefault();
    clearValues()
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          {/* company */}
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          {/* jobLocation */}
          <FormRow type="text" labelText='Job Location' name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
          {/* job type */}
          <FormRowSelect name='jobType' labelText='job type' value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />
          {/* job status */}
          <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}/>
          {/* submit && clear */}
          <div className="btn-container">
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
              Submit
            </button>
            <button className='btn btn-block clear-btn' onClick={handleClearValues}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
