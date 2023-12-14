import React, { useEffect, useState } from 'react';
import style from './profile.module.css';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/adminprofile')
      .then((res) => {
        setAdmins(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={style.main}>
      <div className={style.form}>
        <div className={style.adminadd}>
          <h2 className='fw-bold'>Admin Info</h2>
          <Link to={'/dashbord/addnewadmin'}>
            <Button className='btn btn-warning px-5'>ADD</Button>
          </Link>
        </div>
        <div className={style.tableb}>
          {admins.map((admin, i) => (
            <div className={style.responsebody} key={i}>
              <div className={style.column}>
                <span className='fw-bold'>Email:</span>
                <span>{admin.email}</span>
              </div>
              <div className={style.column}>
                <span className='fw-bold'>Password:</span>
                <span>{admin.password}</span>
              </div>
              <div className={style.column}>
                <Link
                  state={{ admin }}
                  to={`/dashbord/profileupdate/${admin.id}`}
                >
                  <Button variant='success'>UPDATE</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
