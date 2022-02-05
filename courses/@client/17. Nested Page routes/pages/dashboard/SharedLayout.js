import { Outlet, Link } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to='tambah-pekerjaan'>Tambah Pekerjaan</Link>
        <Link to='semua-pekerjaan'>Semua Pekerjaan</Link>
      </nav>
      <Outlet/>
    </Wrapper>
  );
};

export default SharedLayout;
