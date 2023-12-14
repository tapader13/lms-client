import React, { useState } from 'react';
import style from './addadmin.module.css';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/auth/addadminnew', { email, password })
      .then((res) => {
        if (res.data.status) {
          toast('New Admin Added Successfully!', { position: 'top-center' });
          navigate('/dashbord/profile');
          setEmail('');
          setPassword('');
        } else {
          toast(res.data.err, { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        <h3
          style={{
            textAlign: 'center',
            marginBlock: '10px',
            fontWeight: '600',
          }}
        >
          Add New Admin
        </h3>
        <form onSubmit={handleAdd}>
          <div className={style.inp}>
            <label htmlFor='email'>Email:</label>
            <input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              id='email'
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='password'>Password:</label>
            <input
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='password'
              id='password'
            />
          </div>
          <div className={style.btn}>
            <Button onClick={handleAdd} type='submit' variant='outline-light'>
              ADD
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;
