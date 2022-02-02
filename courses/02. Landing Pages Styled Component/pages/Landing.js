import logo from '../assets/images/logo.svg';
import main from '../assets/images/main-img.svg';
// styled-components
import { LandingPage } from '../assets/wrappers';

const Landing = () => {
  return (
    <LandingPage>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </LandingPage>
  );
};

export default Landing;
