import { Link } from 'react-router-dom';
import errorImage from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/Error';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errorImage} alt="not found" />
        <h3>Halaman yang anda cari tidak ditemukan</h3>
        <Link to="/">
          <h3>Kembali ke halaman utama..</h3>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
