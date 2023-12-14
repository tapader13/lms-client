import React, { useEffect, useState } from 'react';
import style from './studentprofile.module.css';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentProfile() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/profile')
      .then((res) => {
        setStudent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(student);

  return (
    <div className={style.main}>
      <div className={style.tableb}>
        {student.map((stu, i) => (
          <div className={style.tableRow} key={i}>
            <div className={style.column}>
              <div className='text-center my-1 '>
                <img
                  className='rounded-circle'
                  height={'150px'}
                  width={'200px'}
                  src={`http://localhost:4000/images/${stu.profilepic}`}
                ></img>
              </div>
            </div>
            <div className={style.column}>
              <strong className={style.act}>Name:</strong> {stu.name}
            </div>
            <div className={style.column}>
              <strong className={style.act}>Email:</strong> {stu.email}
            </div>
            <div className={style.column}>
              <strong className={style.act}>Password:</strong> {stu.password}
            </div>
            <div className={style.column}>
              <strong className={style.act}>Role:</strong> {stu.role}
            </div>
            <div className={style.column}>
              <strong className={style.act}>Actions:</strong>
              <Link
                state={{ stu }}
                to={`/student/dashbord/profileupdate/${stu.id}`}
              >
                <Button variant='success'>UPDATE</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentProfile;
