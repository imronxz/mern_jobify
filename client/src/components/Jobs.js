import moment from 'moment';
import 'moment/locale/id';
//* react-icons
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
//* react-router-dom
import { Link } from 'react-router-dom';
//* Use Context App
import { useAppContext } from '../context/appContext';
//* Wrapper Styled-Component
import Wrapper from '../assets/wrappers/Jobs';
//* Jobs Info
import JobInfo from './JobInfo';

const Jobs = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {
  const { setEditJob, deleteJob } = useAppContext();
  return (
    <Wrapper>
      {/* <h5>{company}</h5>
      <h5></h5> */}
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        {/* Content Center later */}
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={moment(createdAt).format('llll')} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to="" className="btn edit-btn" onClick={() => setEditJob(_id)}>
              Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Jobs;
