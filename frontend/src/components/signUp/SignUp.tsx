import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './signup.module.scss';
import { register } from '../../redux/authSlice';
import { request } from '../../utils/fetchApi';

const Signup = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  // const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      console.log('prev::: ', prev);

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(state).some((v) => v === '')) {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 2500);
    }

    try {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 2500);
      return;

      const headers = {
        'Content-Type': 'application/json',
      };

      const data = await request(`/auth/register`, 'POST', headers, { ...state });

      dispatch(register(data));
      navigate('/');
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input type='text' name='username' placeholder='Username...' onChange={handleState} />
          <input type='text' name='email' placeholder='Email...' onChange={handleState} />
          <div className={classes.checkbox}>
            <label htmlFor='agent'>Register as an agent</label>
            <input id='agent' type='checkbox' name='agent' onChange={handleState} />
          </div>
          <input type='password' name='password' placeholder='Password...' onChange={handleState} />
          <button type='submit'>Register</button>
          <p>
            Already have an account? <Link to='/signin'>Login</Link>
          </p>
        </form>
        {error && <div className={classes.error}>There was an error signing up! Try again.</div>}
        {emptyFields && <div className={classes.error}>Fill all fields!</div>}
      </div>
    </div>
  );
};

export default Signup;
