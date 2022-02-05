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

const Register = () => {
  const { user, isLoading, showAlert, displayAlert , registerUser} = useAppContext()
  const [values, setValues] = useState(initialState);
  //! nvaigate Navigate()
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  // * handleChange
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  // * on submit
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)){
      displayAlert()
      return
    }
    const currentUser = { name, email, password }

    //! check if user is member
    if (isMember) {
      console.log('Berhasil daftar akun');
    } else { 
      registerUser(currentUser)
    }
    console.log(values);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000);
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

export default Register;
