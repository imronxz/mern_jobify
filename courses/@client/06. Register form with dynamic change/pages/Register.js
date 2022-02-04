import { useState, useEffect } from 'react';

// logo
import { FormRow, Logo } from '../components';
// styled-components
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  // global state use Navigate()

  // * handleChange
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  // * on submit
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.targe);
  };

  return (
    <Wrapper className="full-page">
      <form className="form">
        <Logo />
        <h3>Daftar</h3>
        {/* name input */}
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
