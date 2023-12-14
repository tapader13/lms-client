import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import style from './createaccount.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function CreateAccount() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    selected: 'student',
    image: null,
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, selected: e.target.value });
  };
  // const handleImageChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setValues({ ...values, profile: e.target.files[0] });
  //   }
  // };

  const handleCreate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('selected', values.selected);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('image', values.image);
    console.log(formData);
    axios
      .post('http://localhost:4000/auth/createaccount', formData)
      .then((res) => {
        if (res.data.status) {
          toast(`${res.data.role}! created`, { position: 'top-center' });
          if (res.data.role === 'student') {
            navigate('/adminlogin');
          } else if (res.data.role === 'teacher') {
            navigate('/adminlogin');
          }
        } else {
          console.log(res.data.err);
          toast(`${res.data.err}!`, { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.main}>
      <div className={style.content}>
        <form
          className={style.form}
          onSubmit={handleCreate}
          encType='multipart/form-data'
        >
          <p style={{ color: 'orange', fontWeight: 'bold' }}>
            *If the email is not valid you will not get some important benefits*
          </p>
          <div>
            <h4>Select Your Role:-</h4>
            <div className={style.role}>
              <div>
                <label>
                  <input
                    type='radio'
                    value={'student'}
                    name='student'
                    id='student'
                    onChange={handleChange}
                    checked={values.selected === 'student'}
                  />
                  Student
                </label>
              </div>
              <div>
                <label>
                  <input
                    type='radio'
                    value={'teacher'}
                    name='teacher'
                    onChange={handleChange}
                    id='teacher'
                    checked={values.selected === 'teacher'}
                  />
                  Teacher
                </label>
              </div>
            </div>
            <div>
              <div className={style.inp}>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  value={values.name}
                  required
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  name='name'
                  id='name'
                />
              </div>
              <div className={style.inp}>
                <label htmlFor='email'>Email:</label>
                <input
                  required
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  type='email'
                  name='email'
                  id='email'
                />
              </div>
              <div className={style.inp}>
                <label htmlFor='password'>Password:</label>
                <input
                  value={values.password}
                  required
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
              <div className={style.inp}>
                <label htmlFor='image'>Profile Pic:</label>
                <input
                  type='file'
                  onChange={(e) =>
                    setValues({ ...values, image: e.target.files[0] })
                  }
                  name='image'
                  id='image'
                  required
                />
              </div>
            </div>
          </div>
          <div className={`${style.btn}`}>
            <Button type='submit' variant='success px-3 fs-5'>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
