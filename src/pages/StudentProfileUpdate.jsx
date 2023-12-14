import React, { useState } from 'react';
import style from './studentprofileupdate.module.css';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function StudentProfileUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState(location.state.stu.email);
  const [password, setPassword] = useState(location.state.stu.password);
  const [name, setName] = useState(location.state.stu.name);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/studentauth/updatestudenprofile/${id}`, {
        email,
        password,
        name,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(' Update Successfully!', {
            position: 'top-center',
          });
          setEmail('');
          setPassword('');
          setName('');
          navigate('/student/dashbord/studentprofile');
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
            <label htmlFor='name'>Name:</label>
            <input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              type='text'
              name='name'
              id='name'
            />
          </div>
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
              className={style.pass}
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

export default StudentProfileUpdate;
