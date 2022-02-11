import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Jobs from './Jobs';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobContainer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>Tidak ditemukan data dengan keyword tersebut..</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>
      {/* Paggination Buttons */}
    </Wrapper>
  );
};

export default JobContainer;
