//! Link -> react-router-dom@6
import { Link } from 'react-router-dom';

//! components
import { Logo } from '../components';

// styled-components
import Wrapper from '../assets/wrappers/LandingPage';
// main-img.svg
import mainImages from '../assets/images/main-img.svg';

const Landing = () => {
  return (
    <Wrapper>
      {/* TODO: Logo */}
      <nav>
        <Link to="/auth">{<Logo />}/</Link>
      </nav>
      <div className="container page">
        {/* TODO: info */}
        <div className="info">
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            I'm baby +1 plaid hashtag paleo. Mlkshk lomo kinfolk you probably haven't
            heard of them, copper mug portland flannel mumblecore paleo jianbing deep v.
            Flexitarian forage blog banjo pop-up, brunch iceland gluten-free biodiesel
            dreamcatcher. Af chartreuse PBR&B mlkshk edison bulb tote bag meggings jean
            shorts vaporware next level heirloom air plant brooklyn.
          </p>
          <Link to="/auth" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={mainImages} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
