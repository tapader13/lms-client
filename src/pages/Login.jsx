import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSub = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/auth/adminlogin', { email, password })
      .then((res) => {
        if (res.data.loginstatus && res.data.role === 'admin') {
          localStorage.setItem('valid', true);
          navigate('/dashbord');
        } else if (res.data.loginstatus && res.data.role === 'student') {
          localStorage.setItem('valid', true);
          navigate('/student/dashbord');
        } else if (res.data.loginstatus && res.data.role === 'teacher') {
          localStorage.setItem('valid', true);
          navigate('/student/dashbord');
        } else {
          setErr(res.data.err);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.content}>
      <div className={style.main}>
        <Form className={style.form} onSubmit={handleSub}>
          {err && <p style={{ color: 'red' }}>{err}</p>}
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>

          <Button variant='success' type='submit'>
            Login
          </Button>
        </Form>
        <div className={style.link}>
          <Link to={'/createaccount'}>Create a new account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
