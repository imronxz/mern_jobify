import { Outlet, Link } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, BigSideBar, SmallSideBar } from '../../components';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* SmallSideBar */}
        <SmallSideBar />
        {/* BigSideBar */}
        <BigSideBar />
        {/* Navbar */}
        <div>
          <Navbar />
          <div className="dashboard-page">
            {/* Outlet */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
