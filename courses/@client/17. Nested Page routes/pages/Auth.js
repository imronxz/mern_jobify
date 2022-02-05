import { useState, useEffect } from 'react';
//! context costum hooks
import { useAppContext } from '../context/appContext';
//! useNavigate react-router-dom
import { useNavigate } from 'react-router-dom';

// logo
import { FormRow, Logo , Alert} from '../components';
// styled-components
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Auth = () => {
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    authUser
  } = useAppContext()

  //! global state
  const [values, setValues] = useState(initialState);

  //! navigate Navigate()
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // * handleChange
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  // * on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password }

    /* 
    if user is member then -> go to Login,
    if user is not member then -> go to Register
    */
    if (isMember) {
      authUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Berhasil Login! Redirecting...',
      });
    } else { 
      authUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Berhasil Daftar! Redirecting...',
      });
    }
  };

  //! redirect to home pages if there is an User
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  },[user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{ values.isMember ? 'Login Akun' : 'Daftar Akun'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
        )}
        {/* email input */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
        {/* password input */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
        {/* Submit Button */}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        {/* Toggle Member  Masuk/Daftar */}
        <p>
          {values.isMember ? 'Belum punya akun?' : 'Sudah punya akun?'}
          <button type='button' onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Daftar' : 'Masuk'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Auth;
