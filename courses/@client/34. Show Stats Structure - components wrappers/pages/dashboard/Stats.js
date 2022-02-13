import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, ChartsContainer, Loading } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplication } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) <Loading center />;

  return (
    <>
      <StatsContainer />
      {monthlyApplication.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
