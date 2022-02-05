import { useEffect } from 'react';

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1');
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    fetchData();
  }, [])
  return <h1>Dashbaord Pages</h1>
};

export default Dashboard;
