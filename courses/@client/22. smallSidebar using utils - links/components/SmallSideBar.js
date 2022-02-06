import Wrapper from '../assets/wrappers/SmallSideBar';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSideBar = () => {
  const {showSidebar, toggleSidebar} = useAppContext();

  return (
    <Wrapper>
      {/* if true show-sidebar, else close sidebar */}
      <div className={ showSidebar ? "sidebar-container show-sidebar" : 'sidebar-container'}>
        <div className="content">
          {/* trigger button ToggleSidebar */}
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          {/* logo header */}
          <header>
            <Logo/>
          </header>
          {/* NavLinks components -> passign pros toggleSidebar*/}
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
