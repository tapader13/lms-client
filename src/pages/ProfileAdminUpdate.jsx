import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import style from './profile.admin.module.css';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
function ProfileAdminUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [email, setEmail] = useState(location.state.admin.email);
  const [password, setPassword] = useState(location.state.admin.password);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/auth/updateadminprofile/${id}`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(' Update Successfully!', {
            position: 'top-center',
          });
          setEmail('');
          setPassword('');
          navigate('/dashbord/profile');
        } else {
          toast.error(' Update not work!', {
            position: 'top-center',
          });
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
          Update Your Information
        </h3>
        <form onSubmit={handleUpdate}>
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
            <Button type='submit' variant='outline-primary'>
              UPDATE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileAdminUpdate;
