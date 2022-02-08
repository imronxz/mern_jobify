#### Global State Add Job

```js
const initialState = {
  // TODO: job state
  isEditing: false,
  showAlerteditJobId: '',
  position: '',
  company: '',
  // * job location
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
}
```
#### components/FormRowSelect.js
```js
const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

```


#### pages/dashboard/AddJob.js

```js
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/AddJob';

const AddJob = () => {
  const {
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
  } = useAppContext();

  //! TODO: on submit form job
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: validate form
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log('create new job');
  }

  //! TODO: on change input event target
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
  };

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
          {/* submit */}
          <div className="btn-container">
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
```